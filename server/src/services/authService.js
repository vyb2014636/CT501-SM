import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import logModel from '~/models/logModel'

const login = async (reqBody) => {
  try {
    const validUser = await userModel.findOne({ email: reqBody.email }).populate('friends', 'firstname lastname fullname avatar background')
    if (!validUser) throw new ApiError(404, 'Tài khoản không tồn tại')
    if (validUser.status === 'Banned') throw new ApiError(403, 'Tài khoản của bạn đã bị khóa')
    const validPassword = await bcrypt.compare(reqBody.password, validUser.password)

    if (!validPassword) throw new ApiError(400, 'Mật khẩu không chính xác')

    if (validUser && validPassword) {
      validUser.lastLogin = new Date()
      await validUser.save()
      const accessToken = generateAccessToken(validUser)
      const refreshToken = generateRefreshToken(validUser)
      await userModel.findOneAndUpdate({ email: reqBody.email }, { refreshToken, isOnline: true }, { new: true })

      await logModel.create({
        user: validUser._id,
        action: 'LOGIN',
        details: 'Người dùng đăng nhập.'
      })

      return {
        user: validUser,
        accessToken,
        refreshToken
      }
    }
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
export const authService = {
  login,
  getUsersOnline
}
