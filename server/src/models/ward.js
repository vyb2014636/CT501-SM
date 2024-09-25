import mongoose from 'mongoose'

const wardSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true }
})

export default mongoose.model('Ward', wardSchema)
