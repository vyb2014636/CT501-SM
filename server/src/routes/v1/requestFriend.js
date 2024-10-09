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
  .put('/cancelRequest', verifyToken, requestFriendControler.cancelFriendRequest)
  .put('/unfriend', verifyToken, requestFriendControler.unFriend)
  .put('/rejectRequest', verifyToken, requestFriendControler.rejectFriendRequest)
  .put('/acceptRequest', verifyToken, requestFriendControler.acceptFriendRequest)

export const requestFriend = router
