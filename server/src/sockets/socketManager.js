// const usersActive = new Map() // Để quản lý người dùng đang online

// // Hàm quản lý các sự kiện socket
// export const socketManager = (socket, io) => {
//   console.log(`Kết nối thành công với socket ID: ${socket.id}`)

//   // Lắng nghe sự kiện 'user_connected'
//   socket.on('user_connected', (userId) => {
//     usersActive.set(userId, socket.id)
//     console.log(`User ${userId} đã kết nối với socket ID ${socket.id}`)
//     console.log(`Số lượng người dùng đang online: ${usersActive.size}`)
//   })

//   // Lắng nghe sự kiện 'typing'
//   socket.on('typing', (chatId, userId) => {
//     socket.to(chatId).emit('typing', userId)
//   })

//   socket.on('join_chat', (chatId) => {
//     socket.join(chatId) // Người dùng tham gia vào Room với chatId
//     console.log(`User ${socket.id} đã tham gia phòng: ${chatId}`)
//   })
//   // Xử lý sự kiện 'disconnect'
//   socket.on('disconnect', () => {
//     const user = [...usersActive.entries()].find(([, socketId]) => socketId === socket.id)
//     if (user) {
//       usersActive.delete(user[0]) // Xóa user khỏi danh sách khi ngắt kết nối
//       console.log(`User ${user[0]} đã ngắt kết nối`)
//       console.log(`Số lượng người dùng còn lại: ${usersActive.size}`)
//     }
//   })
// }

// // Gửi thông báo
// export const sendNotification = (receiverId, eventName, data) => {
//   const socketId = usersActive.get(receiverId.toString())
//   if (socketId) {
//     io.to(socketId).emit(eventName, data)
//   }
// }

// // Gửi tin nhắn
// export const sendMessage = (receiverId, eventName, data) => {
//   const socketId = usersActive.get(receiverId.toString())
//   if (socketId) {
//     io.to(socketId).emit(eventName, data)
//   }
// }
