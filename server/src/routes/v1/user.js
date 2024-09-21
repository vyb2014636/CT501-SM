import express from 'express'
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

export const user = router
