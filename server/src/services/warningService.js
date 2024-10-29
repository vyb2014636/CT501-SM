import warningModel from '../models/warningModel' // Đảm bảo đường dẫn chính xác

const getWarnings = async () => {
  try {
    const violations = await warningModel.aggregate([
      {
        $group: {
          _id: '$userId', // Nhóm theo userId
          count: { $sum: 1 } // Đếm số lần vi phạm
        }
      },
      {
        $lookup: {
          from: 'users', // Tên collection của mô hình User
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo' // Trả về thông tin người dùng
        }
      },
      {
        $unwind: '$userInfo' // Tách mảng userInfo
      },
      {
        $project: {
          _id: 0, // Không trả về _id của group
          userId: '$_id', // Trả về userId
          email: '$userInfo.email', // Trả về email của người dùng
          count: 1, // Trả về số lần vi phạm,
          fullname: '$userInfo.fullname',
          avatar: '$userInfo.avatar'
        }
      }
    ])

    return violations
  } catch (error) {
    throw error
  }
}

const getWarningByUserId = async (userId) => {
  try {
    const warningsUser = await warningModel.find({ userId }).populate('reportId').populate('userId', 'fullname email avatar isAdmin address')

    return warningsUser
  } catch (error) {
    throw new Error('Lỗi khi lấy vi phạm của người dùng: ' + error.message)
  }
}

export const warningService = {
  getWarnings,
  getWarningByUserId
}
