import express from 'express'
import { reportController } from '~/controllers/reportController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, verifyAdmin, reportController.getReports)
  .post('/', verifyToken, reportController.createReport)
  .put('/handle', verifyToken, verifyAdmin, reportController.handleReport)
  .put('/:reportId/delete-post', verifyToken, verifyAdmin, reportController.resolveReport)
  .post('/:reportId/response', verifyToken, reportController.respondToReport)

export const report = router
