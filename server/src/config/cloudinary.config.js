const { env } = require('./environment')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Cấu hình Cloudinary với các thông tin từ biến môi trường
cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET
})

// Thiết lập cấu hình lưu trữ cho Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Kiểm tra loại file và trả về thư mục tương ứng
    const folderName = 'CT501'
    const allowedFormats = ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi']

    // Giới hạn kích thước file: 10MB cho video, 5MB cho hình ảnh
    if (file.mimetype.startsWith('video/')) {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Video quá lớn. Chỉ cho phép video có kích thước tối đa 10MB.')
      }
    } else if (file.size > 5 * 1024 * 1024) {
      throw new Error('Hình ảnh quá lớn. Chỉ cho phép hình ảnh có kích thước tối đa 5MB.')
    }

    return {
      folder: folderName,
      allowed_formats: allowedFormats,
      resource_type: 'auto'
    }
  }
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
