import express from 'express'
import { statisticController } from '~/controllers/statisticController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, statisticController.statisticDashboard)
router.get('/details', verifyToken, verifyAdmin, statisticController.getStatisticsDetails)

export const statistic = router
