import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'

const login = async (reqBody) => {
  try {
    const validUser = await userModel.findOne({ email: reqBody.email }).populate('friends', 'firstname lastname fullname avatar background')
    if (!validUser) throw new ApiError(404, 'Tài khoản không tồn tại')
    const validPassword = await bcrypt.compare(reqBody.password, validUser.password)

    if (!validPassword) throw new ApiError(400, 'Mật khẩu không chính xác')

    if (validUser && validPassword) {
      validUser.lastLogin = new Date()
      await validUser.save()
      const accessToken = generateAccessToken(validUser)
      const refreshToken = generateRefreshToken(validUser)
      await userModel.findOneAndUpdate({ email: reqBody.email }, { refreshToken }, { new: true })

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

export const authService = {
  login
}
