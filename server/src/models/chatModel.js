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

chatSchema.statics.findAndPopulateChat = async function (query) {
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

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
