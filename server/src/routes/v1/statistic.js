import express from 'express'
import { statisticController } from '~/controllers/statisticController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, statisticController.statisticDashboard)

export const statistic = router
