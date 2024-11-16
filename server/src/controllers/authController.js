import User from '~/models/userModel'
import bcrypt from 'bcrypt'
import ApiError from '~/middlewares/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import { VERIFICATION_EMAIL_TEMPLATE } from '~/utils/mailTemplates'
import { sendMail } from '~/utils/sendMail'
import { authService } from '~/services/authService'
import logModel from '~/models/logModel'
import { env } from '~/config/environment'
import jwt from 'jsonwebtoken'

const register = async (req, res, next) => {
  const { email, lastname, firstname, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw new ApiError(500, 'Tài khoản đã tồn tại')

    const OTP = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(OTP, 10)
    const hashPassword = await bcrypt.hash(password, 10)
    const html = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', OTP)
    const otpExpired = Date.now() + 1 * 60 * 1000

    const newUser = await User.create({
      email,
      lastname,
      firstname,
      password: hashPassword,
      otpVerify: otpHash,
      otpExpired
    })

    await sendMail({ email, html, subject: 'Mã xác thực tài khoản' })

    return res.status(200).json({
      success: true,
      message: newUser ? 'Mã xác thực đã được gửi đến email của bạn,vui lòng kiểm tra email!' : 'Lỗi',
      newUser: { ...newUser._doc, password: undefined }
    })
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  const { otp, email } = req.body

  try {
    if (!otp) throw new ApiError(400, 'Mã xác thực không được để trống!')
    const user = await User.findOne({ email })

    const isMatchOtp = await bcrypt.compare(otp, user?.otpVerify)

    if (!isMatchOtp) throw new ApiError(400, 'Mã không đúng!')
    if (user?.otpExpired < Date.now()) {
      throw new ApiError(400, 'Mã đã hết hạn!')
    }
    // Kiểm tra thời gian hết hạn của mã xác thực

    user.isVerify = true
    user.otpVerify = undefined
    user.otpExpired = undefined
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Email đã xác thực thành công',
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      //   secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    })

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user,
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const cookie = req.cookies
  const { id } = req.user
  try {
    if (!cookie && !cookie.refreshToken) throw new ApiError(500, 'Hiện chưa đăng nhập')

    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: null }, { new: true })
    await User.findByIdAndUpdate(id, { refreshToken: '', isOnline: false }, { new: true })

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict'
    })
    await logModel.create({
      user: id,
      action: 'LOGOUT',
      details: 'Người dùng đăng xuất.'
    })
    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công'
    })
  } catch (error) {
    next(error)
  }
}

const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies
  // const { id } = req.user
  if (!refreshToken) throw new ApiError(500, 'Bạn chưa chứng thực')
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    // if (!user) throw new ApiError(401, 'refreshToken hết hạn')
    const newAccessToken = generateAccessToken(user)
    res.status(200).json({
      message: 'Cập nhật accessToken mới thành công',
      accessToken: newAccessToken
    })
    // jwt.verify(refreshToken, env.JWT_SECRET, async (err, decode) => {
    //   if (err) {
    //     res.clearCookie('refreshToken', {
    //       httpOnly: true,
    //       sameSite: 'strict'
    //     })
    //     return next(new ApiError(401, 'refreshToken không đúng'))
    //   }

    //   const user = await User.findById(decode.id)

    //   const newAccessToken = generateAccessToken(user)

    //   res.status(200).json({
    //     success: user ? true : false,
    //     message: user ? 'Cập nhật accessToken mới thành công' : 'Cập nhật accessToken mới thất bại',
    //     accessToken: newAccessToken
    //   })
    // })
  } catch (error) {
    next(error)
  }
}

const getUsersOnline = async (req, res, next) => {
  try {
    const users = await authService.getUsersOnline()
    res.status(200).json({
      users,
      message: users?.length > 0 ? 'Danh sách người dùng đang hoạt động' : 'Không có người dùng nào hoạt động'
    })
  } catch (error) {
    next(error)
  }
}

const enable2FA = async (req, res, next) => {
  try {
    const myId = req.user.id
    const { email, password } = req.body

    const { qrCode, secret } = await authService.enable2FA(myId, email, password)
    return res.status(200).json({ qrCode, secret: secret.base32 })
  } catch (error) {
    next(error)
  }
}

const disable2FA = async (req, res, next) => {
  try {
    const myId = req.user.id
    const { password } = req.body
    const is2FAEnabled = await authService.disable2FA(myId, password)
    return res.status(200).json({ is2FAEnabled })
  } catch (error) {
    next(error)
  }
}
const verifyAndEnable2FA = async (req, res, next) => {
  try {
    const { email, token } = req.body

    const is2FAEnabled = await authService.verifyAndEnable2FA(email, token)
    return res.status(200).json({ is2FAEnabled })
  } catch (error) {
    next(error)
  }
}

const verify2FA = async (req, res, next) => {
  try {
    const { email, token } = req.body

    const { user, accessToken, refreshToken } = await authService.verify2FA(email, token)
    return res.status(200).json({ user, accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const myId = req.user.id
    const user = await authService.changePassword(myId, currentPassword, newPassword)
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body
    const { message, OTP } = await authService.requestPasswordReset(email)
    return res.status(200).json({ message, OTP })
  } catch (error) {
    next(error)
  }
}

const verifyOTPPassword = async (req, res, next) => {
  try {
    const { email, resetToken } = req.query
    const { message, OTP } = await authService.verifyOTPPassword(email, resetToken)
    return res.status(200).json({ message, OTP })
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { email, resetToken, newPassword } = req.body
    const { message } = await authService.resetPassword(email, resetToken, newPassword)
    return res.status(200).json({ message })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  register,
  verifyEmail,
  login,
  logout,
  refreshAccessToken,
  getUsersOnline,
  enable2FA,
  verifyAndEnable2FA,
  verify2FA,
  disable2FA,
  changePassword,
  requestPasswordReset,
  resetPassword,
  verifyOTPPassword
}
