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
      type: Date
    },
    avatar: {
      type: String,
      default:
        'data:image/png;base64,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'
    },
    background: String,
    about: String,
    address: String,
    refreshToken: String,
    friends: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
      }
    ],
    listPosts: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'Post' }
      }
    ],
    listPostsShare: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'Post' }
      }
    ]
  },
  {
    timestamps: true
  }
)

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     //Kiểm tra xem đã băm hay chưa
//     next()
//   }
//   const salt = await bcrypt.genSaltSync(10)
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

//Export the model
export default mongoose.model('User', userSchema)
