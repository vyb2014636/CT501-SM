import express from 'express'
import { requestFriendControler } from '~/controllers/requestFriendController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, requestFriendControler.getRequests)
  .post('/sendRequest', verifyToken, requestFriendControler.sendFriendRequest)
  .post('/cancelRequest', verifyToken, requestFriendControler.cancelFriendRequest)

export const requestFriend = router
