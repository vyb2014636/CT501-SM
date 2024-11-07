// cronJobs.js
import cron from 'node-cron'
import UserReportStats from '~/models/userReportStats'

const unlockReportPrivileges = async () => {
  const now = new Date()
  const past24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 giờ trước

  // Tìm tất cả người dùng đang bị khóa với thời gian khóa trong vòng 24 giờ qua
  const lockedUsers = await UserReportStats.find({
    lock_until: { $gte: past24Hours, $lte: now }
  })

  // Mở khóa quyền báo cáo cho từng người dùng
  for (let userStats of lockedUsers) {
    userStats.invalid_reports = 0 // Đặt lại số lần báo cáo sai
    userStats.lock_until = null // Xóa thời gian khóa
    await userStats.save()
  }

  console.log(`Đã mở khóa quyền báo cáo cho ${lockedUsers.length} người dùng.`)
}

cron.schedule('0 * * * *', async () => {
  try {
    await unlockReportPrivileges()
  } catch (error) {
    console.error('Lỗi khi mở khóa người dùng:', error)
  }
})
