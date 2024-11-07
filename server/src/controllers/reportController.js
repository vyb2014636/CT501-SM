import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import reportModel from '~/models/reportModel'
import { reportService } from '~/services/reportService'

// Lấy danh sách báo cáo
const getReports = async (req, res, next) => {
  const { status } = req.query
  try {
    const reports = await reportService.getAllReports(status)
    res.status(200).json({
      reports: reports,
      message: reports?.length > 0 ? 'Danh sách khiếu nại' : 'Danh sách rỗng'
    })
  } catch (error) {
    next(error)
  }
}

// Lấy danh sách báo cáo
const getSpamReports = async (req, res, next) => {
  try {
    const reports = await reportService.getSpamReports()
    res.status(200).json({
      reports: reports,
      message: reports?.length > 0 ? 'Danh sách người dùng spam báo cáo' : 'Danh sách rỗng'
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

const resolveReport = async (req, res, next) => {
  const { reportId } = req.params
  const { status, notify } = req.body
  try {
    const report = await reportService.resolveReport(req.user.id, reportId, status, notify)
    res.status(200).json({
      report,
      message: report ? (notify === 'hiddenPost' ? 'Đã ẩn bài đăng' : 'Đã phục hồi bài đăng') : 'Không thao tác được'
    })
  } catch (error) {
    next(error)
  }
}
const resolveNoVioletReport = async (req, res, next) => {
  const { reportId } = req.params
  try {
    const report = await reportService.resolveNoVioletReport(reportId)
    res.status(200).json({
      report,
      message: report ? 'Đã xử lý' : 'Xử lý thất bại'
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

const respondToReport = async (req, res, next) => {
  const { reportId } = req.params
  const { content } = req.body
  const userId = req.user.id
  try {
    const response = await reportService.respondToReport(reportId, userId, content)
    res.status(200).json({
      message: response ? 'Gửi phản hồi thành công' : 'Gửi phản hồi thất bại',
      response
    })
  } catch (error) {
    next(error)
  }
}

export const reportController = { getReports, handleReport, resolveReport, createReport, respondToReport, resolveNoVioletReport, getSpamReports }
