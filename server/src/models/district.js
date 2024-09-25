import mongoose from 'mongoose'

// Schema cho Quận/Huyện
const districtSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true } // Tham chiếu đến Province
})

export default mongoose.model('District', districtSchema)
