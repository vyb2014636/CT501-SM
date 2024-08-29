import User from '~/models/user'
import bcrypt from 'bcrypt'
import ApiError from '~/middlewares/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import { VERIFICATION_EMAIL_TEMPLATE } from '~/utils/mailTemplates'
import { sendMail } from '~/utils/sendMail'

const register = async (req, res, next) => {
  const { email, lastname, firstname, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw new ApiError(500, 'Tài khoản đã tồn tại')

    const OTP = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(OTP, 10)
    const hashPassword = await bcrypt.hash(password, 10)
    const html = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', OTP)
    const otpExpired = Date.now() + 1 * 60 * 1000 // 2 phút từ bây giờ

    const newUser = await User.create({
      email,
      lastname,
      firstname,
      password: hashPassword,
      otpVerify: otpHash,
      otpExpired
    })

    await sendMail({ email, html, subject: 'Mã xác thực tài khoản' })

    setTimeout(async () => {
      const user = await User.findOne({ email })
      if (user && !user.isVerify) {
        await User.deleteOne({ email })
      }
    }, 60000)

    return res.status(200).json({
      success: true,
      mes: newUser ? 'Mã xác thực đã được gửi đến email của bạn,vui lòng kiểm tra email!' : 'Lỗi',
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
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email }).select('-refreshToken')
    if (!validUser) throw new ApiError(500, 'Tài khoản không tồn tại')
    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword) throw new ApiError(500, 'Mật khẩu không chính xác')

    if (validUser && validPassword) {
      validUser.lastLogin = new Date()
      await validUser.save()
      const accessToken = generateAccessToken(validUser)
      //Generate refresh token
      const refreshToken = generateRefreshToken(validUser)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })

      return res.status(200).json({
        mes: 'Đăng nhập thành công',
        user: validUser,
        accessToken,
        refreshToken
      })
    }
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const cookie = req.cookies
  try {
    if (!cookie && !cookie.refreshToken) throw new ApiError(500, 'Hiện chưa đăng nhập')

    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })

    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công'
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  register,
  verifyEmail,
  login,
  logout
}
