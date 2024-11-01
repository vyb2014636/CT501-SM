import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // Tin nhắn trả lời
    type: { type: String, enum: ['text', 'notify'], default: 'text' } // 'text' cho tin nhắn thường, 'system' cho thông báo hệ thống
  },
  { timestamps: true }
)
const Message = mongoose.model('Message', messageSchema)

export default Message
