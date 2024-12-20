// import io from 'socket.io-client'
// import { store } from '../redux/store'
// import { receiveNotify } from '@/features/notification/notificationSlice'
// import { toast } from 'react-toastify'
// import { pushListRequests } from '@/features/request/requestSlice'
// import { updateFriends } from '@/features/auth/authSlice'
// import env from '@/utils/enviroment'

// const socket = io(env.SOCKET_URL)

// export const connectUser = (userId) => {
//   socket.emit('user_connected', userId)
// }

// export const disconnectUser = () => {
//   socket.disconnect()
// }

// socket.on('newPost', (data) => {
//   store.dispatch(receiveNotify(data.notification))
//   toast.info(`${data.userName} đã đăng 1 bài viết mới.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
// })

// socket.on('sharedPost', (data) => {
//   store.dispatch(receiveNotify(data.notification))
//   toast.info(`${data.userName} đã chia sẻ bài viết của bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
// })

// socket.on('friendRequestAccepted', (data) => {
//   store.dispatch(receiveNotify(data.notification))
//   store.dispatch(updateFriends({ user: data.friend, actionType: 'add' }))
//   toast.success(`${data.userName} đã chấp nhận yêu cầu kết bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
// })

// socket.on('friendRequestReject', (data) => {
//   store.dispatch(receiveNotify(data.notification))
//   toast.info(`${data.userName} đã từ chối yêu cầu kết bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 300 })
// })

// socket.on('sendAddFriend', (data) => {
//   toast.info(`Có yêu cầu kết bạn mới.`, { position: 'top-center', hideProgressBar: true, onClose: 300 })
//   store.dispatch(pushListRequests(data.request))
// })

// socket.on('unFriend', (data) => {
//   store.dispatch(updateFriends({ user: data.unFriend, actionType: 'remove' }))
// })

// export default socket

import io from 'socket.io-client'
import { store } from '../redux/store'
import { receiveNotify } from '@/features/notification/notificationSlice'
import { toast } from 'react-toastify'
import { pushListRequests } from '@/features/request/requestSlice'
import { updateFriends } from '@/features/auth/authSlice'
import env from '@/utils/enviroment'
import { receiveMessage } from '@/features/chat/messageSlice'
import { pushChat, removeChat, updateLastMessage, updateNewGroup } from '@/features/chat/chatSlice'
import { setUserOffline, setUserOnline } from '@/features/online/onlineSlice'
import { triggerReload } from '@/features/loading/reloadSlice'

// Khởi tạo socket với các tùy chọn
const socket = io(env.SOCKET_URL, {
  autoConnect: false, // Tắt tự động kết nối
  reconnection: true, // Kích hoạt kết nối lại
  reconnectionAttempts: Infinity, // Không giới hạn số lần kết nối lại
  reconnectionDelay: 1000, // Thời gian trễ giữa các lần kết nối lại
  timeout: 20000 // Thời gian tối đa chờ kết nối
})

// Hàm kết nối người dùng
export const connectUser = (userId) => {
  socket.connect()
  socket.emit('user_connected', userId)
}

// Thực hiện ngắt kết nối
export const disconnectUser = () => {
  socket.disconnect()
}

socket.on('connect', () => {
  console.log('Connected to server')
})

socket.on('disconnect', (reason) => {
  console.log('Disconnected from server:', reason)
  if (reason === 'io server disconnect') {
    socket.connect()
  }
})

// Lắng nghe các sự kiện kết nối lỗi và cố gắng kết nối lại
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error)
  toast.error('Kết nối gặp sự cố. Đang thử kết nối lại...', { position: 'top-center' })
})

socket.on('reconnect_attempt', (attempt) => {
  console.log(`Reconnecting attempt: ${attempt}`)
  toast.info(`Đang cố gắng kết nối lại...`, { position: 'top-center' })
})

// Lắng nghe các sự kiện khác
socket.on('newPost', (data) => {
  store.dispatch(receiveNotify(data.notification))
  store.dispatch(triggerReload())

  toast.info(`${data.userName} đã đăng 1 bài viết mới.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
})

socket.on('sharedPost', (data) => {
  store.dispatch(receiveNotify(data.notification))
  store.dispatch(triggerReload())

  toast.info(`${data.userName} đã chia sẻ bài viết của bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
})

socket.on('friendRequestAccepted', (data) => {
  store.dispatch(receiveNotify(data.notification))
  store.dispatch(updateFriends({ user: data.friend, actionType: 'add' }))
  toast.success(`${data.userName} đã chấp nhận yêu cầu kết bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
})

socket.on('friendRequestReject', (data) => {
  store.dispatch(receiveNotify(data.notification))
  toast.info(`${data.userName} đã từ chối yêu cầu kết bạn.`, { position: 'top-center', hideProgressBar: true, onClose: 300 })
})

socket.on('sendAddFriend', (data) => {
  toast.info(`Có yêu cầu kết bạn mới.`, { position: 'top-center', hideProgressBar: true, onClose: 300 })
  store.dispatch(pushListRequests(data.request))
})

socket.on('unFriend', (data) => {
  store.dispatch(updateFriends({ user: data.unFriend, actionType: 'remove' }))
})
socket.on('receive_message', (data) => {
  store.dispatch(receiveMessage({ newMessage: data.newMessage, chatId: data.chatID }))
  store.dispatch(updateLastMessage(data))
})

socket.on('created_group', (data) => {
  store.dispatch(updateNewGroup(data))
})

socket.on('user_online_status', (data) => {
  store.dispatch(setUserOnline(data.userId))
})
socket.on('user_offline_status', (data) => {
  store.dispatch(setUserOffline(data.userId))
})
socket.on('dissolveGroup', (data) => {
  store.dispatch(removeChat(data.chat))
})
socket.on('isRemoveGroup', (data) => {
  toast.info(`Bạn đã bị xóa khỏi nhóm ${data?.chat?.chatName}`)
  store.dispatch(removeChat(data.chat))
})
socket.on('add_group', (data) => {
  store.dispatch(pushChat(data.chat))
})

export default socket
