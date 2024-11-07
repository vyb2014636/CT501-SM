import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import reportModel from '~/models/reportModel'
import { statisticService } from '~/services/statisticService'

// Lấy danh sách báo cáo
const statisticDashboard = async (req, res, next) => {
  try {
    const stats = await statisticService.statisticDashboard()
    res.status(200).json({
      stats,
      message: 'Danh sách thống kê'
    })
  } catch (error) {
    next(error)
  }
}

export const statisticController = { statisticDashboard }
