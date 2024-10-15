import io from 'socket.io-client'
import { store } from '../redux/store'
import { receiveNotify } from '@/features/notification/notificationSlice'
import { toast } from 'react-toastify'
import { pushListRequests } from '@/features/request/requestSlice'
import { updateFriends } from '@/features/auth/authSlice'
import env from '@/utils/enviroment'

const socket = io(env.SOCKET_URL)

export const connectUser = (userId) => {
  socket.emit('user_connected', userId)
}

export const disconnectUser = () => {
  socket.disconnect()
}

socket.on('newPost', (data) => {
  store.dispatch(receiveNotify(data.notification))
  toast.info(`${data.userName} đã đăng 1 bài viết mới.`, { position: 'top-center', hideProgressBar: true, onClose: 200 })
})

socket.on('sharedPost', (data) => {
  store.dispatch(receiveNotify(data.notification))
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

export default socket
