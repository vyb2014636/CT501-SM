import express from 'express'
import { userController } from '~/controllers/userController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/noFriends', verifyToken, userController.getListUserNoFriend)
  .get('/favorites', (req, res) => {
    return res.status(200).json({
      message: 'signup'
    })
  })
  .get('/listRequests', verifyToken, userController.getRequest)
  .post('/sendFriend', verifyToken, userController.sendFriendRequest)
  .post('/acceptFriend', verifyToken, userController.acceptFriendRequest)

export const user = router
