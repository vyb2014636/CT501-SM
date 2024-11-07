import express from 'express'
import { reportController } from '~/controllers/reportController'
import verifyAdmin from '~/middlewares/verifyAdmin'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .get('/', verifyToken, verifyAdmin, reportController.getReports)
  .get('/spamReports', verifyToken, verifyAdmin, reportController.getSpamReports)
  .post('/', verifyToken, reportController.createReport)
  .put('/handle', verifyToken, verifyAdmin, reportController.handleReport)
  .put('/:reportId/hiddenPost', verifyToken, verifyAdmin, reportController.resolveReport)
  .put('/:reportId/unViolet', verifyToken, verifyAdmin, reportController.resolveNoVioletReport)
  .post('/:reportId/response', verifyToken, reportController.respondToReport)

export const report = router
