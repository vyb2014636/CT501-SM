import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { userController } from '~/controllers/userController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/noFriends', verifyToken, userController.getSuggestions)
  .get('/favorites', (req, res) => {
    return res.status(200).json({
      message: 'signup'
    })
  })
  .put('/unFriend', verifyToken, userController.unFriend)
  .put('/uploadAvatar', verifyToken, uploadCloud.single('avatar'), userController.uploadAvatar)

export const user = router
