import express from 'express'
import { authController } from '~/controllers/authController'
import verifyToken from '~/middlewares/verifyToken'
import { authValidation } from '~/validations/authValidation'

const router = express.Router()

router
  .post('/login', authValidation.validLogin, authController.login)
  .post('/signup', authValidation.validRegister, authController.register)
  .post('/changePassword', verifyToken, authValidation.validChangePassword, authController.changePassword)
  .post('/forgotPassword', authController.requestPasswordReset)
  .post('/resetPassword', authValidation.validResetPassword, authController.resetPassword)
  .post('/verifyEmail', authController.verifyEmail)
  .post('/verify2FA', authController.verify2FA)
  .post('/enable-2fa', verifyToken, authController.enable2FA)
  .post('/disable-2fa', verifyToken, authController.disable2FA)
  .post('/verifyEnable2FA', verifyToken, authController.verifyAndEnable2FA)
  .get('/logout', verifyToken, authController.logout)
  .get('/online', verifyToken, authController.getUsersOnline)
  .get('/refreshToken', verifyToken, authController.refreshAccessToken)
  .get('/verifyResetOTP', authController.verifyOTPPassword)
// .get('/:id',verifyToken,authController.profile)

export const auth = router
