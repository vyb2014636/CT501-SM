import ApiError from '~/middlewares/ApiError'
import verifyToken from './verifyToken'

const verifyAdmin = (req, res, next) => {
  verifyToken((req, res) => {
    if (req.user.isAdmin) next()
    else throw new ApiError(500, 'Bạn không phải là admin')
  })
}

export default verifyAdmin
