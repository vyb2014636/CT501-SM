import express from 'express'
import { authController } from '~/controllers/authController'
import verifyToken from '~/middlewares/verifyToken'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router
  .post('/login', authValidation.validLogin, authController.login)
  .post('/signup', authValidation.validRegister, authController.register)
// .get('/:id',verifyToken,authController.profile)

export const auth = router
