// cronJobs.js
import cron from 'node-cron'
import postModel from '~/models/postModel'
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

// Cập nhật bài viết trạng thái "trash" hơn 30 ngày thành "delete"
const updateOldTrashPosts = async () => {
  const now = Date.now()

  const trashPosts = await postModel.find({
    status: 'trash',
    updatedAt: { $lte: new Date(now - 30 * 24 * 60 * 60 * 1000) }
  })

  for (let post of trashPosts) {
    post.status = 'delete'
    await post.save()
  }

  console.log(`Đã cập nhật trạng thái "trash" thành "delete" cho ${trashPosts.length} bài viết.`)
}

// Xóa bài viết nếu đã có status "delete" hơn 7 ngày
const deleteOldPosts = async () => {
  const now = Date.now()

  // Tìm các bài viết có status "delete" và tồn tại hơn 7 ngày
  const deletePosts = await postModel.find({
    status: 'delete',
    updatedAt: { $lte: new Date(now - 7 * 24 * 60 * 60 * 1000) } // Kiểm tra các bài viết đã tồn tại hơn 7 ngày
  })

  // Xóa bài viết khỏi cơ sở dữ liệu
  for (let post of deletePosts) {
    await post.remove()
  }

  console.log(`Đã xóa ${deletePosts.length} bài viết với trạng thái "delete" quá 7 ngày.`)
}

cron.schedule('0 0 * * *', async () => {
  try {
    await unlockReportPrivileges()
    await updateOldTrashPosts()

    await deleteOldPosts()
  } catch (error) {
    console.error(error.message)
  }
})
