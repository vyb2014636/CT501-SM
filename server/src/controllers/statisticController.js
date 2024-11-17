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

// Lấy thống kê cho dashboard
// const getStatisticsDetails = async (req, res, next) => {
//   try {
//     const { year, month } = req.query

//     const stats = await statisticService.getStatisticsDetails(year, month)

//     res.status(200).json({
//       stats,
//       message: 'Danh sách thống kê'
//     })
//   } catch (error) {
//     next(error)
//   }
// }
const getStatisticsDetails = async (req, res, next) => {
  try {
    const { type, month, year } = req.query

    let stats = {}

    switch (type) {
      case 'users':
        stats = await statisticService.getUsersStatistics(year, month)
        break
      case 'posts':
        stats = await statisticService.getPostsStatistics(year, month)
        break
      case 'bannedUsers':
        stats = await statisticService.getBannedUsersStatistics(year, month)
        break
      case 'systemUserRange':
        stats = await statisticService.getUserSystemRangeDate()
        break
      case 'systemPostRange':
        stats = await statisticService.getPostSystemRangeDate()
        break
      default:
        return res.status(400).json({ message: 'Không xác nhận' })
    }

    res.status(200).json({
      stats,
      message: 'Danh sách thống kê'
    })
  } catch (error) {
    next(error)
  }
}

export const statisticController = { statisticDashboard, getStatisticsDetails }
