import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { userController } from '~/controllers/userController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

// Middleware xác thực token cho tất cả các route dưới đây
router.use(verifyToken)

// Routes liên quan đến bạn bè
router
  .get('/users', verifyAdmin, userController.getUsers)
  .get('/userLog', verifyAdmin, userController.getHistoryByUser)
  .get('/noFriends', userController.getSuggestions) // Gợi ý người dùng chưa kết bạn
  .put('/unFriend', userController.unFriend) // Hủy kết bạn

// Routes tìm kiếm người dùng
router
  .get('/search', userController.searchUser) // Tìm kiếm người dùng
  .get('/searchAll', userController.getAllSearch) // Tìm kiếm tất cả người dùng
  .delete('/removeSearch', userController.deleteHistorySearch)

// Routes liên quan đến upload thông tin và ảnh
router
  .put('/uploadInfo', userController.uploadInfo) // Upload thông tin người dùng
  .put('/updateStatusForUser', verifyAdmin, userController.toggleUserStatus) // Upload thông tin người dùng
  .put('/uploadAvatar', uploadCloud.single('avatar'), userController.uploadAvatar) // Upload ảnh đại diện
  .put('/uploadBackground', uploadCloud.single('background'), userController.uploadBackground) // Upload ảnh nền

router
  .get('/favorites', userController.getFavorites)
  .post('/favorite/:postId', userController.addFavorite)
  .delete('/favorite/:postId', userController.removeFavorite)

export const user = router
