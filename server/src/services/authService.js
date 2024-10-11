import ApiError from '~/middlewares/ApiError'
import Post from '~/models/post'
import User from '~/models/user'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'

const login = async (reqBody) => {
  const validUser = await User.findOne({ email: reqBody.email }).populate('friends', 'firstname lastname avatar background')
  if (!validUser) throw new ApiError(404, 'Tài khoản không tồn tại')
  const validPassword = await bcrypt.compare(reqBody.password, validUser.password)
  if (!validPassword) throw new ApiError(400, 'Mật khẩu không chính xác')

  if (validUser && validPassword) {
    validUser.lastLogin = new Date()
    await validUser.save()
    const accessToken = generateAccessToken(validUser)
    const refreshToken = generateRefreshToken(validUser)

    await User.findOneAndUpdate({ email: reqBody.email }, { refreshToken }, { new: true })

    return {
      user: validUser,
      accessToken,
      refreshToken
    }
  }
}

export const authService = {
  login
}
