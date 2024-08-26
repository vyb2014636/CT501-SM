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
    phone: {
      type: String,
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
    avatar: String,
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
