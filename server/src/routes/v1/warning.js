import express from 'express'
import { warningController } from '~/controllers/warningController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, warningController.getWarnings)
router.get('/:userId', verifyToken, verifyAdmin, warningController.getWarningsForUser)

export const warning = router
