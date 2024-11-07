import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['CREATE_POST', 'REPORT_POST', 'SHARED_POST', 'LOGIN', 'LOGOUT'],
    required: true
  },
  details: {
    type: String
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
logSchema.pre(/(find|findOne|findById)/, function (next) {
  this.populate('user', 'avatar background isAdmin fullname').populate({
    path: 'post',
    populate: [
      {
        path: 'sharedPost',
        populate: {
          path: 'byPost',
          select: 'firstname lastname email background avatar'
        }
      },
      {
        path: 'byPost',
        select: 'firstname lastname email background avatar'
      },
      {
        path: 'sharesBy',
        select: 'firstname lastname email background avatar'
      }
    ]
  })

  next()
})

const Log = mongoose.model('Log', logSchema)

export default Log
