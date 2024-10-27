import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    reportCode: { type: String, unique: true }, // Mã báo cáo duy nhất
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    reason: {
      type: String,
      required: true
      // enum: ['spam', 'hate speech', 'inappropriate content']
    },
    status: { type: String, enum: ['pending', 'resolved', 'dismissed'], default: 'pending' },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

const Report = mongoose.model('Report', reportSchema)

export default Report
