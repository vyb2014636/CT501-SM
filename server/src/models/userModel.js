import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    fullname: {
      type: String
    },
    normalizedFullName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isOnline: {
      type: Boolean
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Active', 'Banned'],
      default: 'Active'
    },
    lastLogin: {
      type: Date
    },
    otpVerify: {
      type: String
    },
    otpExpired: {
      type: Date,
      expires: '1m'
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpire: {
      type: Date
    },

    avatar: {
      type: String
    },
    background: String,
    refreshToken: String,
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    historySearch: [
      {
        content: { type: String }
      }
    ],
    province: String,
    is2FAEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    lastPasswordChange: {
      type: Date,
      default: null
    },
    blockDate: {
      type: Date,
      default: null
    },
    lastInfoChange: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

userSchema.statics.findByIdPopulateAddress = function (userId) {
  return this.findById(userId).populate('friends').select('-password ')
}
userSchema.pre('save', function (next) {
  this.fullname = `${this.firstname} ${this.lastname}`
  this.normalizedFullName = removeDiacritics(`${this.firstname} ${this.lastname}`).toLowerCase()
  next()
})

const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const User = mongoose.model('User', userSchema)

export default User
