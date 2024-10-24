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
    isBlock: {
      type: Boolean,
      default: false
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
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
    avatar: {
      type: String
    },
    background: String,
    about: String,
    refreshToken: String,
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    address: {
      province: String,
      district: String,
      ward: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.statics.findByIdPopulateAddress = function (userId) {
  return this.findById(userId).populate('friends address.province address.district address.ward').select('-password')
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
