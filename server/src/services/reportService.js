import ApiError from '~/middlewares/ApiError'
import reportModel from '~/models/reportModel'
import { v4 as uuidv4 } from 'uuid'

const getAllReports = async () => {
  return await reportModel.find().populate('reporter reportedUser post')
}
const handleReport = async (reportId, action) => {
  const updatedReport = await reportModel.findByIdAndUpdate(reportId, { status: action === 'resolve' ? 'resolved' : 'dismissed' }, { new: true })
  return updatedReport
}
const deletePostIfReportValid = async (reportId) => {
  const report = await reportModel.findById(reportId).populate('postId')
  if (!report || report.status !== 'resolved') {
    throw new ApiError(404, 'Báo cáo không hợp lệ hoặc chưa được xử lý')
  }
  // Xóa post
  await report.post.remove() // Giả sử bạn có phương thức xóa post
  return report
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
