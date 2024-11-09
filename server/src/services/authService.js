import ApiError from '~/middlewares/ApiError'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import logModel from '~/models/logModel'
const login = async (reqBody) => {
  try {
    const { email, password } = reqBody

    // Tìm người dùng theo email và lấy thông tin bạn cần (bao gồm password để xác thực)
    const validUser = await userModel.findOne({ email }).populate('friends', 'firstname lastname fullname avatar background') // Lấy bạn bè

    if (!validUser) {
      throw new ApiError(404, 'Tài khoản không tồn tại')
    }

    if (validUser.status === 'Banned') {
      throw new ApiError(403, 'Tài khoản của bạn đã bị khóa')
    }

    // Kiểm tra mật khẩu
    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword) {
      throw new ApiError(400, 'Mật khẩu không chính xác')
    }

    // Cập nhật thông tin đăng nhập và lưu lại
    validUser.lastLogin = new Date()
    await validUser.save()

    // Tạo accessToken và refreshToken
    const accessToken = generateAccessToken(validUser)
    const refreshToken = generateRefreshToken(validUser)

    // Cập nhật refreshToken và trạng thái online của người dùng
    await userModel.findOneAndUpdate({ email }, { refreshToken, isOnline: true }, { new: true })

    // Lưu log đăng nhập
    await logModel.create({
      user: validUser._id,
      action: 'LOGIN',
      details: 'Người dùng đăng nhập.'
    })

    // Lọc bỏ password và refreshToken trước khi trả về thông tin người dùng
    validUser.password = undefined // Xóa password
    validUser.refreshToken = undefined // Xóa refreshToken

    // Trả về thông tin người dùng và các token
    return {
      user: validUser, // Trả về thông tin người dùng đã được lọc
      accessToken,
      refreshToken
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
