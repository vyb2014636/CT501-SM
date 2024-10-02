import express from 'express'
import { notificationController } from '~/controllers/notificationController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.put('/', notificationController.interactNotification).get('/', verifyToken, notificationController.getListNotification)

export const notification = router
