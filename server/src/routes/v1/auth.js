import express from 'express'
import { authController } from '~/controllers/authController'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router
  .post('/login', authValidation.validLogin, authController.login)
  .post('/signup', authValidation.validRegister, authController.register)
  .post('/verifyEmail', authController.verifyEmail)
  .get('/logout', authController.logout)
// .get('/:id',verifyToken,authController.profile)

export const auth = router
