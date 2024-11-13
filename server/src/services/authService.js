import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import logModel from '~/models/logModel'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { sendMail } from '~/utils/sendMail'
import { VERIFICATION_EMAIL_TEMPLATE } from '~/utils/mailTemplates'
const login = async (reqBody) => {
  try {
    const { email, password } = reqBody

    const validUser = await userModel.findOne({ email }).populate('friends', 'firstname lastname fullname avatar background')

    if (!validUser) throw new ApiError(404, 'Tài khoản không tồn tại')

    if (validUser.status === 'Banned') throw new ApiError(403, 'Tài khoản của bạn đã bị khóa')

    const validPassword = await bcrypt.compare(password, validUser.password)

    if (!validPassword) throw new ApiError(400, 'Mật khẩu không chính xác')

    if (validUser.is2FAEnabled) {
      // Tạo mã OTP sử dụng twoFactorSecret
      const token = speakeasy.totp({
        secret: validUser.twoFactorSecret,
        encoding: 'base32'
      })
      const html = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', token)

      await sendMail({ email: validUser.email, html, subject: 'Mã xác thực 2FA' })

      return { user: validUser, accessToken: '', refreshToken: '' }
    }

    const accessToken = generateAccessToken(validUser)
    const refreshToken = generateRefreshToken(validUser)

    validUser.lastLogin = new Date()
    await validUser.save()

    validUser.password = undefined
    validUser.refreshToken = undefined

    await userModel.findOneAndUpdate({ email }, { refreshToken, isOnline: true }, { new: true })

    await logModel.create({
      user: validUser._id,
      action: 'LOGIN',
      details: 'Người dùng đăng nhập.'
    })

    return { user: validUser, accessToken, refreshToken }
  } catch (error) {
    throw error
  }
}
const verify2FA = async (email, token) => {
  try {
    const user = await userModel.findOne({ email }).populate('friends', 'firstname lastname fullname avatar background')

    if (!user) throw new Error('Người dùng không tồn tại.')

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token
    })

    if (!verified) throw new Error('Mã OTP không hợp lệ.')

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.lastLogin = new Date()
    await user.save()

    user.password = undefined
    user.refreshToken = undefined

    await userModel.findOneAndUpdate({ email }, { refreshToken, isOnline: true }, { new: true })

    return { user, accessToken, refreshToken }
  } catch (error) {
    throw error
  }
}
const getUsersOnline = async () => {
  try {
    const users = await userModel.find({ isOnline: true }).select('fullname')
    return users
  } catch (error) {
    throw error
  }
}

const enable2FA = async (email) => {
  try {
    const user = await userModel.findOne({ email })

    if (!user) throw new ApiError(404, 'Người dùng không tồn tại.')

    const secret = speakeasy.generateSecret({ name: `Vmedia (${email})` })
    user.twoFactorSecret = secret.base32
    await user.save()

    const qrCode = await QRCode.toDataURL(secret.otpauth_url)
    return { qrCode, secret }
  } catch (error) {
    throw error
  }
}

const verifyAndEnable2FA = async (email, token) => {
  try {
    const user = await userModel.findOne({ email }).populate('friends', 'firstname lastname fullname avatar background')

    if (!user) throw new ApiError(404, 'Người dùng không tồn tại.')

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token
    })
    if (!verified) throw new ApiError(403, 'Mã OTP không hợp lệ.')
    user.is2FAEnabled = true
    await user.save()
    return user.is2FAEnabled
  } catch (error) {
    throw error
  }
}

const disable2FA = async (myId) => {
  try {
    const user = await userModel.findById(myId)

    if (!user) throw new ApiError(404, 'Người dùng không tồn tại.')

    if (!user.is2FAEnabled) throw new ApiError(400, 'Chế độ xác thực 2FA đã tắt.')

    user.is2FAEnabled = false
    user.twoFactorSecret = undefined
    await user.save()

    return user.is2FAEnabled
  } catch (error) {
    throw error
  }
}

const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await userModel.findById(userId).populate('friends', 'firstname lastname fullname avatar background')
    if (!user) throw new ApiError(404, 'Người dùng không tồn tại')

    if (user.lastPasswordChange && Date.now() - user.lastPasswordChange < 24 * 60 * 60 * 1000)
      throw new ApiError(400, 'Bạn chỉ có thể thay đổi mật khẩu một lần trong 24 giờ.')

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) throw new ApiError(400, 'Mật khẩu hiện tại không chính xác')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.lastPasswordChange = Date.now() // Cập nhật thời gian thay đổi mật khẩu
    await user.save()

    user.password = undefined
    user.refreshToken = ''
    user.twoFactorSecret = ''
    return user
  } catch (error) {
    throw error
  }
}
const requestPasswordReset = async (email) => {
  try {
    const user = await userModel.findOne({ email })
    if (!user) throw new ApiError(404, 'Không tìm thấy người dùng với email này')

    const OTP = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(OTP, 10)
    const html = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', OTP)

    await sendMail({ email: email, html, subject: 'OTP để tìm lại mật khẩu' })

    user.resetPasswordToken = otpHash
    user.resetPasswordExpire = Date.now() + 1 * 60 * 1000 //1 phút
    await user.save()

    return { message: 'Đã gửi email hướng dẫn thay đổi mật khẩu' }
  } catch (error) {
    throw error
  }
}

const resetPassword = async (resetToken, newPassword) => {
  try {
    // Tìm người dùng với reset token và kiểm tra thời gian hết hạn
    const user = await userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) throw new ApiError(400, 'Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    return { message: 'Mật khẩu đã được thay đổi thành công' }
  } catch (error) {
    throw error
  }
}

export const authService = {
  login,
  getUsersOnline,
  enable2FA,
  verifyAndEnable2FA,
  verify2FA,
  disable2FA,
  requestPasswordReset,
  changePassword,
  resetPassword
}
