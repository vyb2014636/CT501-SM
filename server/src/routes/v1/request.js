import express from 'express'
import { requestController } from '~/controllers/requestController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, requestController.getRequests)
  .get('/requests-to-me', verifyToken, requestController.getRequestsToMe)
  .get('/requests-my-sent', verifyToken, requestController.getRequestMySent)
  .get('/friendship/:checkUserId', verifyToken, requestController.checkFriendshipStatus)
  .post('/sendRequest', verifyToken, requestController.sendFriendRequest)
  .put('/cancelRequest', verifyToken, requestController.cancelFriendRequest)
  .put('/unfriend', verifyToken, requestController.unFriend)
  .put('/rejectRequest', verifyToken, requestController.rejectFriendRequest)
  .put('/acceptRequest', verifyToken, requestController.acceptFriendRequest)

export const request = router
