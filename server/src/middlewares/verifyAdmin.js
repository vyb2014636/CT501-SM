import ApiError from '~/middlewares/ApiError'
import verifyToken from './verifyToken'

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next() // Nếu là admin, cho phép tiếp tục
  } else {
    throw new ApiError(403, 'Bạn không có quyền truy cập') // Nếu không phải admin, trả về lỗi 403
  }
}

export default verifyAdmin
