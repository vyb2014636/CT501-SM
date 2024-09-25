import express from 'express'
import { addressController } from '~/controllers/addressController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.get('/', verifyToken, addressController.getAddresses)

export const address = router
