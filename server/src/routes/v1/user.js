import express from 'express'
import { userController } from '~/controllers/userController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/profile', (req, res) => {
    return res.status(200).json({
      message: 'login'
    })
  })
  .get('/favorites', (req, res) => {
    return res.status(200).json({
      message: 'signup'
    })
  })
  .post('/sendFriend', verifyToken, userController.sendFriendRequest)
  .post('/acceptFriend', verifyToken, userController.acceptFriendRequest)

export const user = router
