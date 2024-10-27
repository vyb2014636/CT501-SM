import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import reportModel from '~/models/reportModel'
import { reportService } from '~/services/reportService'

// Lấy danh sách báo cáo
const getReports = async (req, res, next) => {
  try {
    const reports = await reportService.getAllReports()
    res.status(200).json({
      reports: reports,
      message: reports?.length > 0 ? 'Danh sách khiếu nại' : 'Danh sách rỗng'
    })
  } catch (error) {
    next(error)
  }
}

// Xử lý báo cáo
const handleReport = async (req, res, next) => {
  const { reportId, action } = req.body // action có thể là 'resolve' hoặc 'dismiss'
  try {
    const updatedReport = await reportService.handleReport(reportId, action)
    res.status(200).json({
      updatedReport,
      message: updatedReport ? 'Xử lý thành công' : 'Xử lý thất bại'
    })
  } catch (error) {
    next(error)
  }
}

const deletePostBasedOnReport = async (req, res, next) => {
  const { reportId } = req.params
  try {
    const report = await reportService.deletePostIfReportValid(reportId)
    res.status(200).json({
      report,
      message: 'Đã xóa bài đăng'
    })
  } catch (error) {
    next(error)
  }
}

const createReport = async (req, res, next) => {
  try {
    const newReport = await reportService.createReport(req.body)
    res.status(200).json({
      newReport,
      message: newReport ? 'Báo cáo đã được gửi' : 'Báo cáo không gửi được'
    })
  } catch (error) {
    next(error)
  }
}

export const reportController = { getReports, handleReport, deletePostBasedOnReport, createReport }
