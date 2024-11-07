import mongoose from 'mongoose'

const userReportStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    total_reports: {
      type: Number,
      default: 1
    },
    invalid_reports: {
      type: Number,
      default: 0
    },
    lock_until: {
      type: Date,
      default: null
    },
    report_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
  },
  { timestamps: true }
)

// Middleware to populate report history details on find
userReportStatsSchema.pre(/(find|findOne|findById)/, function (next) {
  this.populate('user', 'firstname lastname fullname email avatar').populate({
    path: 'report_history',
    select: 'reportCode status reason'
  })
  next()
})

const UserReportStats = mongoose.model('UserReportStats', userReportStatsSchema)

export default UserReportStats
