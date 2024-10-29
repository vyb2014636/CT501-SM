import ApiError from '~/middlewares/ApiError'
import reportModel from '~/models/reportModel'
import { v4 as uuidv4 } from 'uuid'
import postModel from '~/models/postModel'
import notificationModel from '~/models/notificationModel'
import warningModel from '~/models/warningModel'

const notifyReport = async (adminID, userReceiver, type, postId) => {
  try {
    const notification = new notificationModel({
      sender: adminID,
      receiver: userReceiver,
      type: type,
      postId
    })
    await notification.save()
    await notification.populate('sender postId', 'firstname lastname fullname avatar isAdmin')
  } catch (error) {
    throw error
  }
}

const saveWarning = async (userId, reportId, message) => {
  try {
    const warning = new warningModel({
      userId,
      reportId,
      message
    })
    await warning.save()
    return warning // Trả về warning nếu cần
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
const deletePostIfReportValid = async (adminID, reportId) => {
  try {
    const report = await reportModel.findById(reportId)
    if (!report || report.status !== 'pending') {
      throw new ApiError(404, 'Báo cáo không hợp lệ hoặc chưa được xử lý')
    }

    // Populate post nếu báo cáo hợp lệ
    await report.populate('post')

    const deletePost = await postModel.findByIdAndDelete(report.post)
    if (deletePost) {
      await reportModel.updateMany({ post: report.post._id, status: 'pending' }, { status: 'resolved' })

      await notifyReport(adminID, report.post.byPost, 'deletePost', report.post._id)

      report.status = 'resolved'

      report.save()

      await saveWarning(report.reportedUser, report._id, report.reason)

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
  if (reqBody.reason === '' || !reporterID || !reportedUserID || !postID)
    throw new ApiError(400, 'Vui lòng nhập lý do và không được để trống người dùng muốn báo cáo')
  const reportCode = uuidv4()
  const newReport = new reportModel({ reportedUser: reportedUserID, reporter: reporterID, post: postID, reason, reportCode }) // Gán mã báo cáo vào dữ liệu
  return await newReport.save()
}

export const reportService = {
  getAllReports,
  handleReport,
  deletePostIfReportValid,
  createReport
}
