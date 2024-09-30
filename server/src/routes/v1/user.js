import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { userController } from '~/controllers/userController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/noFriends', verifyToken, userController.getSuggestions)
  .get('/search', verifyToken, userController.searchUser)
  .get('/favorites', (req, res) => {
    return res.status(200).json({
      message: 'signup'
    })
  })
  .put('/unFriend', verifyToken, userController.unFriend)
  .put('/uploadInfo', verifyToken, userController.uploadInfo)
  .put('/uploadAvatar', verifyToken, uploadCloud.single('avatar'), userController.uploadAvatar)
  .put('/uploadBackground', verifyToken, uploadCloud.single('background'), userController.uploadBackground)

export const user = router
