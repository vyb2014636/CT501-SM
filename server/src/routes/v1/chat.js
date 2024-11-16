import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { chatController } from '~/controllers/chatController'
import { messageController } from '~/controllers/messageController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, chatController.getChats)
  .get('/:chatId/messages', verifyToken, messageController.getMessages)
  .post('/', verifyToken, chatController.accessChat)
  .post('/group', verifyToken, uploadCloud.single('avatarGroup'), chatController.createGroupChat)
  .post('/sendMessage', verifyToken, uploadCloud.single('image'), messageController.sendMessage)
  .post('/addMemberGroup', verifyToken, chatController.addMemberToGroup)
  .post('/removeMemberGroup', verifyToken, chatController.removeMemberFromGroup)
  .post('/leaveGroup', verifyToken, chatController.leaveGroup)
  .put('/updateAdmin', verifyToken, chatController.updateGroupAdmin)
  .delete('/dissolve', verifyToken, chatController.dissolveGroup)

export const chat = router
