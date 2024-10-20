import { Server } from 'socket.io'

let io
const usersActive = new Map()

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    console.log(`Kết nối thành công`) // Cập nhật số lượng người dùng khi có kết nối mới

    socket.on('user_connected', (userId) => {
      usersActive.set(userId, socket.id) // Lưu userId và socketId vào Map
      console.log(`User ${userId} đã kết nối với socket ID ${socket.id}`)
      console.log(`Số lượng User đã kết nối: ${usersActive.size}`)
    })

    // Lắng nghe sự kiện 'typing'
    socket.on('typing', (chatId, userId) => {
      // Gửi thông báo cho những người khác trong cuộc trò chuyện
      socket.to(chatId).emit('typing', userId)
    })

    socket.on('disconnect', () => {
      const user = [...usersActive.entries()].find(([, socketId]) => socketId === socket.id)
      if (user) {
        usersActive.delete(user[0]) // Xóa user khỏi Map khi ngắt kết nối
        console.log(`User ${user[0]} đã ngắt kết nối`)
        console.log(`Số lượng User đã kết nối: ${usersActive.size}`) // Cập nhật số lượng người dùng sau khi một người dùng ngắt kết nối
      }
    })
  })
}

export const sendNotification = (receiverId, eventName, data) => {
  const socketId = usersActive.get(receiverId.toString())
  if (socketId) {
    io.to(socketId).emit(eventName, data)
  }
}

export const sendMessage = (receiverId, eventName, data) => {
  const socketId = usersActive.get(receiverId.toString())
  if (socketId) {
    io.to(socketId).emit(eventName, data)
  }
}
