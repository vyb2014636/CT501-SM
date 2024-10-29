import ApiError from '~/middlewares/ApiError'
import { warningService } from '~/services/warningService'

const getWarnings = async (req, res, next) => {
  try {
    const warnings = await warningService.getWarnings()
    res.status(200).json({
      message: 'Danh sách cảnh báo',
      warnings
    })
  } catch (error) {
    next(error)
  }
}
const getWarningsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const warningsUser = await warningService.getWarningByUserId(userId)
    res.status(200).json({
      message: warningsUser.length > 0 ? 'Danh sách các lỗi cho người dùng' : 'Không có danh sách lỗi nào cho người dùng này',
      warningsUser
    })
  } catch (error) {}
}

export const warningController = { getWarnings, getWarningsForUser }
