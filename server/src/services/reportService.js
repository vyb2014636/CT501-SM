import ApiError from '~/middlewares/ApiError'
import reportModel from '~/models/reportModel'
import { v4 as uuidv4 } from 'uuid'
import postModel from '~/models/postModel'
import notificationModel from '~/models/notificationModel'
import warningModel from '~/models/warningModel'

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

const getAllReports = async () => {
  return await reportModel.find().sort({ createdAt: -1 }) // -1 để sắp xếp theo thứ tự giảm dần (mới nhất trước)
}
const handleReport = async (reportId, action) => {
  const updatedReport = await reportModel.findByIdAndUpdate(reportId, { status: action === 'resolve' ? 'resolved' : 'dismissed' }, { new: true })
  return updatedReport
}
const resolveReport = async (adminID, reportId, status, notify) => {
  console.log(status, notify)
  try {
    const report = await reportModel.findById(reportId)

    if (!report || report.status === 'resolved') throw new ApiError(404, 'Báo cáo đã được xử lý')

    await report.populate('post')

    const hiddenPost = await postModel.findByIdAndUpdate(report.post, { status }, { new: true })
    if (hiddenPost) {
      await reportModel.updateMany(
        {
          post: report.post._id,
          $or: [{ status: 'pending' }, { status: 'reprocess' }]
        },
        { status: 'resolved' }
      )

      await notifyReport(adminID, report.post.byPost, notify, report.post._id, report._id)

      report.status = 'resolved'

      report.save()

      await saveWarning(report.reportedUser, report._id, report.reason, notify)

      return report
    } else {
      throw new ApiError(400, 'Xóa thất bại')
    }
  } catch (error) {
    throw error
  }
}

const createReport = async (reqBody) => {
  const { reporterID, reportedUserID, postID, reason } = reqBody

  if (reason === '' || !reporterID || !reportedUserID || !postID) {
    throw new ApiError(400, 'Vui lòng nhập lý do và không được để trống người dùng muốn báo cáo')
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
  respondToReport
}
