import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { chatController } from '~/controllers/chatController'
import { messageController } from '~/controllers/messageController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, chatController.getChats)
  .post('/', verifyToken, chatController.accessChat)
  .post('/group', verifyToken, uploadCloud.single('avatarGroup'), chatController.createGroupChat)
  .get('/:chatId/messages', verifyToken, messageController.getMessages)
  .post('/sendMessage', verifyToken, messageController.sendMessage)

export const chat = router
