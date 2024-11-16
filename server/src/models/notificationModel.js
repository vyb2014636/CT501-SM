import mongoose from 'mongoose'

var notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'friendRequestAccepted',
      'friendRequestReject',
      'newPost',
      'sharedPost',
      'warning',
      'report',
      'hiddenPost',
      'restorePost',
      'removeGroup',
      'dissolve'
    ],
    required: true
  },
  sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: false }, // Chỉ khi thông báo liên quan tới bài đăng
  reportId: { type: mongoose.Types.ObjectId, ref: 'Report', required: false }, // Chỉ khi thông báo liên quan tới bài đăng
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
