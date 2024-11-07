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
    },
    status: { type: String, enum: ['pending', 'resolved', 'warning', 'reprocess'], default: 'pending' },
    isValidation: { type: Boolean, default: false },
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)
reportSchema.pre(/(find|findOne|findById)/, function (next) {
  this.populate('reporter')
    .populate('reportedUser')
    .populate({
      path: 'replies.user', // Populate user in replies
      select: 'firstname lastname fullname email background avatar'
    })
    .populate({
      path: 'post',
      populate: [
        {
          path: 'byPost',
          select: 'firstname lastname fullname email background avatar'
        },
        {
          path: 'sharesBy',
          select: 'firstname lastname fullname email background avatar'
        },

        {
          path: 'sharedPost',
          populate: {
            path: 'byPost',
            select: 'firstname lastname fullname email background avatar'
          }
        }
      ]
    })

  next()
})

const Report = mongoose.model('Report', reportSchema)

export default Report
