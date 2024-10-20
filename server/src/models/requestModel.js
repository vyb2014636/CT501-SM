const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'cancelled', 'unfriended'],
      default: 'pending'
    },
    history: [
      {
        status: { type: String, enum: ['pending', 'accepted', 'declined', 'cancelled', 'blocked', 'unfriended'], required: true },
        timestamp: { type: Date, default: Date.now },
        actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

requestSchema.methods.populateFromToFrienship = function () {
  return this.populate('from to', 'firstname lastname fullname avatar background')
}

requestSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.history.push({
      status: this.status,
      actionBy: this.from
    })
  }
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('Request', requestSchema)
