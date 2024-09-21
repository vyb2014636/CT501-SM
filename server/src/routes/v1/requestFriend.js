import express from 'express'
import { requestFriendControler } from '~/controllers/requestFriendController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, requestFriendControler.getRequests)
  .get('/requests-to-me', verifyToken, requestFriendControler.getRequestsToMe)
  .get('/requests-my-sent', verifyToken, requestFriendControler.getRequestMySent)
  .get('/friendship/:checkUserId', verifyToken, requestFriendControler.checkFriendshipStatus)
  .post('/sendRequest', verifyToken, requestFriendControler.sendFriendRequest)
  .post('/cancelRequest', verifyToken, requestFriendControler.cancelFriendRequest)
  .post('/rejectRequest', verifyToken, requestFriendControler.rejectFriendRequest)
  .post('/acceptRequest', verifyToken, requestFriendControler.acceptFriendRequest)

export const requestFriend = router
