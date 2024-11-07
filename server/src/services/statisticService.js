import userModel from '~/models/userModel'
import postModel from '~/models/postModel'

const calculateGrowthRate = (current, previous) => {
  if (previous === 0 && current > 0) return '100%' // Tăng trưởng hoàn toàn nếu tháng trước là 0
  if (previous === 0 && current === 0) return '0%' // Không có thay đổi nếu cả hai đều là 0
  if (current === 0 && previous > 0) return '0%' // Giảm hoàn toàn nếu tháng này là 0
  return (((current - previous) / previous) * 100).toFixed(2) + '%'
}

const statisticDashboard = async () => {
  try {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // 1. Tổng số lượng người dùng
    const totalUsers = await userModel.countDocuments()

    // 2. Người dùng mới trong tháng này
    const newUsersThisMonth = await userModel.countDocuments({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 0)
      }
    })

    // 3. Người dùng mới tháng trước
    const lastMonthStart = new Date(currentYear, currentMonth - 1, 1)
    const lastMonthEnd = new Date(currentYear, currentMonth, 0)
    const newUsersLastMonth = await userModel.countDocuments({
      createdAt: {
        $gte: lastMonthStart,
        $lte: lastMonthEnd
      }
    })

    // 4. Tổng số lượng bài đăng
    const totalPosts = await postModel.countDocuments()
    const totalPostsThisMonth = await postModel.countDocuments({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 0)
      }
    })
    const totalPostsLastMonth = await postModel.countDocuments({
      createdAt: {
        $gte: lastMonthStart,
        $lte: lastMonthEnd
      }
    })

    // 5. Tổng số lượng người dùng bị khóa (status = 'Banned')
    const totalBannedUsers = await userModel.countDocuments({ status: 'Banned' })
    const totalBannedUsersLastMonth = await userModel.countDocuments({
      status: 'Banned',
      createdAt: {
        $gte: lastMonthStart,
        $lte: lastMonthEnd
      }
    })

    const growthTotalUsers = calculateGrowthRate(totalUsers, totalUsers - newUsersThisMonth)
    const growthNewUsers = calculateGrowthRate(newUsersThisMonth, newUsersLastMonth)
    const growthTotalPosts = calculateGrowthRate(totalPostsThisMonth, totalPostsLastMonth)
    const growthBannedUsers = calculateGrowthRate(totalBannedUsers, totalBannedUsersLastMonth)

    return {
      totalUsers,
      growthTotalUsers,
      newUsersThisMonth,
      growthNewUsers,
      totalPosts,
      growthTotalPosts,
      totalBannedUsers,
      growthBannedUsers
    }
  } catch (error) {
    throw error
  }
}
export const statisticService = { statisticDashboard }
