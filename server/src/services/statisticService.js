import userModel from '~/models/userModel'
import postModel from '~/models/postModel'

const calculateGrowthRate = (current, previous) => {
  if (previous === 0 && current > 0) return '100%' // Tăng trưởng hoàn toàn nếu tháng trước là 0
  if (previous === 0 && current === 0) return '0%' // Không có thay đổi nếu cả hai đều là 0
  if (current === 0 && previous > 0) return '0%' // Giảm hoàn toàn nếu tháng này là 0
  return (((current - previous) / previous) * 100).toFixed(2) + '%'
}

const getMonthDateRange = (year, month) => {
  const start = new Date(year, month - 1, 1) // Ngày đầu tiên của tháng
  const end = new Date(year, month, 0) // Ngày cuối cùng của tháng
  return { start, end }
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
const getSystemDateRange = async (model) => {
  try {
    const systemStartDate = await model.findOne().sort({ createdAt: 1 }).select('createdAt')
    const startDate = systemStartDate ? systemStartDate.createdAt : new Date()

    const systemEndDate = await model.findOne().sort({ createdAt: -1 }).select('createdAt')
    const endDate = systemEndDate ? systemEndDate.createdAt : new Date()

    return { startDate, endDate }
  } catch (error) {
    throw error
  }
}

// Sử dụng cho người dùng
const getUserSystemRangeDate = async () => {
  return await getSystemDateRange(userModel)
}

// Sử dụng cho người dùng
const getUserBannedSystemRangeDate = async () => {
  try {
    const systemStartDate = await model.findOne({ status: 'banned' }).sort({ createdAt: 1 }).select('blockDate')
    const startDate = systemStartDate ? systemStartDate.createdAt : new Date()

    const systemEndDate = await model.findOne({ status: 'banned' }).sort({ createdAt: -1 }).select('blockDate')
    const endDate = systemEndDate ? systemEndDate.createdAt : new Date()

    return { startDate, endDate }
  } catch (error) {
    throw error
  }
}

// Sử dụng cho bài đăng
const getPostSystemRangeDate = async () => {
  return await getSystemDateRange(postModel)
}

const getStatisticsDetails = async (year = null, month = null) => {
  try {
    const currentDate = new Date()

    // Nếu không truyền year và month, lấy tháng hiện tại làm mặc định
    const currentYear = year || currentDate.getFullYear()
    const currentMonth = month || currentDate.getMonth() + 1 // Tháng hiện tại (JS bắt đầu từ 0)
    const { start: currentStart, end: currentEnd } = getMonthDateRange(currentYear, currentMonth)

    // Ngày bắt đầu hệ thống
    const systemStartDate = await userModel.findOne().sort({ createdAt: 1 }).select('createdAt') // Lấy người dùng đầu tiên
    const systemStart = systemStartDate ? systemStartDate.createdAt : new Date()

    // 1. Danh sách người dùng (trừ admin)
    const allUsers = await userModel
      .find({ isAdmin: false })
      .select('firstname lastname email avatar createdAt') // Trường cần thiết
      .sort({ createdAt: -1 }) // Sắp xếp mới nhất

    const usersThisMonth = await userModel
      .find({
        isAdmin: false,
        createdAt: { $gte: currentStart, $lte: currentEnd }
      })
      .select('firstname lastname email avatar createdAt')
      .sort({ createdAt: -1 })

    // 2. Danh sách bài đăng
    const allPosts = await postModel
      .find()
      .select('describe images videos createdAt byPost')
      .populate({
        path: 'byPost',
        select: 'firstname lastname email avatar'
      })
      .sort({ createdAt: -1 })

    const postsThisMonth = await postModel
      .find({ createdAt: { $gte: currentStart, $lte: currentEnd } })
      .select('describe images videos createdAt byPost')
      .populate({
        path: 'byPost',
        select: 'firstname lastname email avatar'
      })
      .sort({ createdAt: -1 })

    // 3. Danh sách người dùng bị khóa
    const allBannedUsers = await userModel.find({ status: 'Banned' }).select('firstname lastname email avatar createdAt').sort({ createdAt: -1 })

    const bannedUsersThisMonth = await userModel
      .find({
        status: 'Banned',
        createdAt: { $gte: currentStart, $lte: currentEnd }
      })
      .select('firstname lastname email avatar createdAt')
      .sort({ createdAt: -1 })

    return {
      systemStart,
      allUsers,
      usersThisMonth,
      allPosts,
      postsThisMonth,
      allBannedUsers,
      bannedUsersThisMonth
    }
  } catch (error) {
    throw error
  }
}

const getUsersStatistics = async (year = null, month = null) => {
  try {
    const systemUserStartResponse = await getUserSystemRangeDate()

    const currentDate = systemUserStartResponse.endDate || new Date()
    const currentYear = year || currentDate.getFullYear()
    const currentMonth = month || currentDate.getMonth() + 1 //
    const { start: currentStart, end: currentEnd } = getMonthDateRange(currentYear, currentMonth)

    const allUsers = await userModel
      .find({ isAdmin: false, createdAt: { $gte: systemUserStartResponse.startDate, $lte: currentEnd } })
      .select('firstname lastname fullname status isVerify email avatar province createdAt')
      .sort({ createdAt: 1 })

    // Lấy người dùng trong tháng hiện tại
    const usersThisMonth = await userModel
      .find({
        isAdmin: false,
        createdAt: { $gte: currentStart, $lte: currentEnd }
      })
      .select('firstname lastname fullname status isVerify email avatar province createdAt')
      .sort({ createdAt: -1 })

    return {
      allUsers,
      usersThisMonth
    }
  } catch (error) {
    throw error
  }
}

const getPostsStatistics = async (year = null, month = null) => {
  try {
    const systemPostStartResponse = await getPostSystemRangeDate()

    const currentDate = systemPostStartResponse.endDate || new Date()
    const currentYear = year || currentDate.getFullYear()
    const currentMonth = month || currentDate.getMonth() + 1
    const { start: currentStart, end: currentEnd } = getMonthDateRange(currentYear, currentMonth)

    const allPosts = await postModel
      .find({ createdAt: { $gte: systemPostStartResponse.startDate, $lte: currentEnd } })
      .select('describe images videos createdAt byPost')
      .populate({
        path: 'byPost',
        select: 'firstname lastname fullname status isVerify email avatar'
      })
      .sort({ createdAt: 1 })

    const postsThisMonth = await postModel
      .find({ createdAt: { $gte: currentStart, $lte: currentEnd } })
      .select('describe images videos createdAt byPost')
      .populate({
        path: 'byPost',
        select: 'firstname lastname fullname status isVerify email avatar'
      })
      .sort({ createdAt: -1 })

    return {
      allPosts,
      postsThisMonth
    }
  } catch (error) {
    throw error
  }
}

const getBannedUsersStatistics = async (year = null, month = null) => {
  try {
    const systemUserStartResponse = await getUserBannedSystemRangeDate()

    const currentDate = systemUserStartResponse.endDate || new Date()
    const currentYear = year || currentDate.getFullYear()
    const currentMonth = month || currentDate.getMonth() + 1
    const { start: currentStart, end: currentEnd } = getMonthDateRange(currentYear, currentMonth)

    const allBannedUsers = await userModel
      .find({ status: 'Banned', createdAt: { $gte: systemUserStartResponse.startDate, $lte: currentEnd } })
      .select('firstname lastname email avatar createdAt blockDate')
      .sort({ createdAt: 1 })

    const bannedUsersThisMonth = await userModel
      .find({
        status: 'Banned',
        createdAt: { $gte: currentStart, $lte: currentEnd }
      })
      .select('firstname lastname email avatar createdAt blockDate')
      .sort({ createdAt: -1 })

    return {
      allBannedUsers,
      bannedUsersThisMonth
    }
  } catch (error) {
    throw error
  }
}

export const statisticService = {
  statisticDashboard,
  getStatisticsDetails,
  getUsersStatistics,
  getPostsStatistics,
  getBannedUsersStatistics,
  getPostSystemRangeDate,
  getUserSystemRangeDate
}
