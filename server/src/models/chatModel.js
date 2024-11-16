import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, default: null },
    avatar: { type: String, default: null },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

chatSchema.statics.findOneAndPopulateChat = async function (query) {
  return await this.findOne(query)
    .populate('users', 'fullname avatar')
    .populate('groupAdmin', '-password')
    .populate({
      path: 'latestMessage',
      populate: {
        path: 'sender',
        select: 'fullname avatar'
      }
    })
}

chatSchema.statics.findByIdAndPopulateChat = async function (query) {
  return await this.findById(query)
    .populate('users', 'fullname avatar')
    .populate('groupAdmin', '-password')
    .populate({
      path: 'latestMessage',
      populate: {
        path: 'sender',
        select: 'fullname avatar'
      }
    })
}
chatSchema.statics.findAndPopulateChat = async function (query) {
  return await this.find(query)
    .populate('users', 'fullname avatar')
    .populate('groupAdmin', '-password')
    .populate({
      path: 'latestMessage',
      populate: {
        path: 'sender',
        select: 'fullname avatar'
      }
    })
}

// chatSchema.pre(/(find|findOne|findById)/, function (next) {
//   this.populate('users', 'fullname avatar')
//     .populate('groupAdmin', '-password')
//     .populate({
//       path: 'latestMessage',
//       populate: {
//         path: 'sender',
//         select: 'fullname avatar'
//       }
//     })
//   next()
// })

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
