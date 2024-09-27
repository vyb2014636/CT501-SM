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
    address: String,
    refreshToken: String,
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    address: {
      province: String, // Tham chiếu đến Province
      district: String, // Tham chiếu đến District
      ward: String // Tham chiếu đến Ward
    }
  },
  {
    timestamps: true
  }
)

userSchema.statics.findByIdPopulateAddress = function (userId) {
  return this.findById(userId).populate('friends address.province address.district address.ward').select('-password')
}

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     //Kiểm tra xem đã băm hay chưa
//     next()
//   }
//   const salt = await bcrypt.genSaltSync(10)
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

const User = mongoose.model('User', userSchema)

export default User
