import ApiError from '~/middlewares/ApiError'
import reportModel from '~/models/reportModel'
import { v4 as uuidv4 } from 'uuid'
import postModel from '~/models/postModel'
import notificationModel from '~/models/notificationModel'
import warningModel from '~/models/warningModel'
import logModel from '~/models/logModel'
import UserReportStats from '~/models/userReportStats'

const notifyReport = async (adminID, userReceiver, type, postId, reportId) => {
  try {
    const notification = new notificationModel({
      sender: adminID,
      receiver: userReceiver,
      type: type,
      postId,
      reportId
    })
    await notification.save()
    await notification.populate('sender postId', 'firstname lastname fullname avatar isAdmin')
  } catch (error) {
    throw error
  }
}
const saveWarning = async (userId, reportId, message, notify) => {
  try {
    if (notify === 'hiddenPost') {
      // Nếu bài viết bị ẩn, tạo mới cảnh báo
      const warning = new warningModel({
        userId,
        reportId,
        message
      })
      await warning.save()
    }

    if (notify === 'restorePost') {
      const update = await warningModel.findOneAndDelete({ userId, reportId, message })
      if (!update) {
        console.log('Không tìm thấy cảnh báo để xóa')
      }
    }
  } catch (error) {
    throw error
  }
}

const lockReportPrivilege = async (userStats) => {
  const lockDuration = 24 * 60 * 60 * 1000
  userStats.lock_until = new Date(Date.now() + lockDuration)
  await userStats.save()
}
const updateInvalidForUser = async (reportedBy, reportId) => {
  try {
    let userStats = await UserReportStats.findOne({ user: reportedBy._id })
    if (!userStats) {
      userStats = new UserReportStats({ user: reportedBy })
    }
    userStats.invalid_reports += 1
    userStats.report_history.push(reportId)

    if (userStats.invalid_reports > 5) {
      await lockReportPrivilege(userStats)
    } else {
      await userStats.save()
    }
  } catch (error) {
    throw error
  }
}

const getAllReports = async (status) => {
  const reports = await reportModel.find({ status }).sort({ createdAt: -1 })
  return reports
}

const getSpamReports = async () => {
  const reports = await UserReportStats.find({ invalid_reports: { $gt: 0 } }).sort({ createdAt: -1 })
  return reports
}

const handleReport = async (reportId, action) => {
  const updatedReport = await reportModel.findByIdAndUpdate(reportId, { status: action === 'resolve' ? 'resolved' : 'dismissed' }, { new: true })
  return updatedReport
}

const resolveReport = async (adminID, reportId, status, notify) => {
  try {
    const report = await reportModel.findById(reportId)

    if (!report || report.status === 'resolved') throw new ApiError(404, 'Báo cáo đã được xử lý')

    await reportModel.updateMany(
      {
        post: report.post._id,
        $or: [{ status: 'pending' }, { status: 'reprocess' }]
      },
      { status: 'resolved', isValidation: 'hiddenPost' ? true : false }
    )

    report.status = 'resolved'
    report.save()

    if (notify === 'hiddenPost') await saveWarning(report.reportedUser, report._id, report.reason, notify)

    if (notify === 'restorePost') updateInvalidForUser(report.reporter, report._id)

    await postModel.findByIdAndUpdate(report.post, { status }, { new: true })
    await notifyReport(adminID, report.post.byPost, notify, report.post._id, report._id)

    return report
  } catch (error) {
    throw error
  }
}

const resolveNoVioletReport = async (reportId) => {
  const report = await reportModel.findById(reportId)

  if (report) {
    await reportModel.updateMany(
      {
        post: report.post._id,
        $or: [{ status: 'pending' }, { status: 'reprocess' }]
      },
      { status: 'resolved', isValidation: false }
    )

    report.status = 'resolved'

    report.save()

    updateInvalidForUser(report.reporter, report._id)

    return report
  } else {
    throw new ApiError(400, 'Thất bại')
  }
}

const createReport = async (reqBody, myId) => {
  const { reporterID, reportedUserID, postID, reason } = reqBody

  if (reason === '' || !reporterID || !reportedUserID || !postID)
    throw new ApiError(400, 'Vui lòng nhập lý do và không được để trống người dùng muốn báo cáo')

  const userStats = await UserReportStats.findOne({ user: reporterID })

  if (userStats && userStats.invalid_reports > 5)
    throw new ApiError(403, 'Tài khoản của bạn tạm thời bị hạn chế gửi báo cáo do quá nhiều báo cáo sai.')

  if (userStats) {
    userStats.total_reports += 1
    await userStats.save()
  } else {
    new UserReportStats({ user: reporterID })
  }

  const existingReport = await reportModel.findOne({
    reportedUser: reportedUserID,
    reporter: reporterID,
    post: postID
  })

  if (existingReport) {
    throw new ApiError(400, 'Bạn đã báo cáo bài viết này trước đó.')
  }

  const reportCode = uuidv4()

  const newReport = new reportModel({
    reportedUser: reportedUserID,
    reporter: reporterID,
    post: postID,
    reason,
    reportCode
  })

  await logModel.create({
    user: myId,
    action: 'REPORT_POST',
    details: 'Người dùng đã báo cáo bài viết.',
    post: newReport.post._id
  })

  return await newReport.save()
}

const respondToReport = async (reportId, userId, content) => {
  try {
    const report = await reportModel.findById(reportId)
    if (!report) throw new ApiError(404, 'Báo cáo không tồn tại')
    if (report.replies?.length >= 5) throw new ApiError(400, 'Bạn chỉ gửi được tối đa 5 phản hồi')
    if (report.reportedUser._id.toString() !== userId) throw new ApiError(403, 'Đây không phải bài viết của bạn')

    report.replies.push({
      user: userId,
      content: content,
      createdAt: new Date()
    })
    report.status = 'reprocess'

    await report.save()

    return report
  } catch (error) {
    throw error
  }
}
export const reportService = {
  getAllReports,
  handleReport,
  resolveReport,
  createReport,
  respondToReport,
  resolveNoVioletReport,
  getSpamReports
}
