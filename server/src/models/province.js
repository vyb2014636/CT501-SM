import mongoose from 'mongoose'

// Schema cho Tỉnh/Thành phố
const provinceSchema = new mongoose.Schema({
  code: { type: String, required: true }, // Mã tỉnh/thành phố
  name: { type: String, required: true } // Tên tỉnh/thành phố
})

export default mongoose.model('Province', provinceSchema)
