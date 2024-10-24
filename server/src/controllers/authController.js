import User from '~/models/userModel'
import bcrypt from 'bcrypt'
import ApiError from '~/middlewares/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import { VERIFICATION_EMAIL_TEMPLATE } from '~/utils/mailTemplates'
import { sendMail } from '~/utils/sendMail'
import { authService } from '~/services/authService'

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

    res.cookie('refreshToken', login.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
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
    await User.findByIdAndUpdate(id, { refreshToken: '', isActive: false }, { new: true })

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

const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies
  const { id } = req.user
  if (!refreshToken) throw new ApiError(500, 'Bạn chưa chứng thực')

  try {
    jwt.verify(refreshToken, env.JWT_SECRET, async (err, user) => {
      if (err) throw new ApiError(401, 'refreshToken không đúng')

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
      })

      const updateRefreshToken = await User.findByIdAndUpdate(
        id,
        { refreshToken: newRefreshToken },
        { new: true } // trả về document đã cập nhật
      )

      return res.status(200).json({
        success: updateRefreshToken ? true : false,
        message: updateRefreshToken ? 'Cập nhật accessToken mới thành công' : 'Cập nhật accessToken mới thất bại',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      })
    })
  } catch (error) {
    next(error)
  }
}

export const authController = {
  register,
  verifyEmail,
  login,
  logout,
  refreshAccessToken
}
