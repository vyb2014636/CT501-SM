import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import ApiError from '~/middlewares/ApiError'

const verifyToken = (req, res, next) => {
  const token = req.headers.token
  const refreshToken = req.cookies.refreshToken
  if (token) {
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, env.JWT_SECRET, (err, decode) => {
      if (err) throw new ApiError(401, 'Token không hợp lệ')
      req.user = decode //trong decode chỉ có _id và isAdmin
      next()
    })
  } else {
    throw new ApiError(500, 'Bạn chưa đăng nhập')
  }
}
export default verifyToken
