import User from '~/models/user'
import bcrypt from 'bcrypt'
import ApiError from '~/utils/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'

const register = async (req, res, next) => {
  const { email, lastname, firstname, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = await User.findOne({ email })
    if (user) throw new ApiError(500, 'Tài khoản đã tồn tại')
    const newUser = await User.create({ email, lastname, firstname, password: hashed })
    return res.status(200).json({ mes: newUser ? 'Tạo thành công' : 'Lỗi', data: newUser ? newUser : 'undifined' })
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
  login
}
