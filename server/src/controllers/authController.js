import User from '~/models/user'
import bcrypt from 'bcrypt'
import ApiError from '~/middlewares/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import { sendVerificationEmail, sendWelcomeEmail } from '~/utils/mailtraps/mailsFunction'
import { VERIFICATION_EMAIL_TEMPLATE } from '~/utils/mailtraps/mailTemplates'
import { sendMail } from '~/utils/sendMail'

const register = async (req, res, next) => {
  const { email, lastname, firstname, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw new ApiError(500, 'Tài khoản đã tồn tại')

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const newUser = await User.create({
      email,
      lastname,
      firstname,
      password: hashed,
      codeVerification: verificationToken,
      codeVerificationExpiresAt: Date.now() + 1 * 60 * 1000
    })
    const html = VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
    await sendMail({ email, html, subject: 'Mã xác thực tài khoản' })
    // await sendVerificationEmail(newUser.email, verificationToken)
    setTimeout(async () => {
      await User.deleteOne({ email })
    }, 500000)
    return res.status(200).json({
      mes: newUser ? 'Mã xác thực đã được gửi đến email của bạn,vui lòng kiểm tra email!' : 'Lỗi',
      newUser: { ...newUser._doc, password: undefined }
    })
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  const { code, email } = req.body

  try {
    if (!code) throw new ApiError(400, 'Mã xác thực không được để trống!')
    const user = await User.findOne({
      codeVerification: code
    })
    if (!user) throw new ApiError(400, 'Mã không đúng!')
    // Kiểm tra thời gian hết hạn của mã xác thực
    if (user.codeVerificationExpiresAt <= Date.now()) {
      throw new ApiError(400, 'Mã đã hết hạn!')
    }

    user.isVerify = true
    user.codeVerification = undefined
    user.codeVerificationExpiresAt = undefined
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
    if (!validUser) throw new ApiError(404, 'Tài khoản không tồn tại')
    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword) throw new ApiError(404, 'Mật khẩu không chính xác')
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

export const authController = {
  register,
  verifyEmail,
  login
}
