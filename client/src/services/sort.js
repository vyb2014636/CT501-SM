// Hàm sắp xếp các đoạn chat dựa trên latestMessage.createdAt hoặc createdAt
export const sortChatsByLatestMessage = (chats) => {
  // Tạo bản sao của mảng chats để tránh thay đổi trực tiếp mảng gốc
  const chatsCopy = [...chats]

  return chatsCopy.sort((a, b) => {
    const dateA = a.latestMessage ? new Date(a.latestMessage.createdAt) : new Date(a.createdAt)
    const dateB = b.latestMessage ? new Date(b.latestMessage.createdAt) : new Date(b.createdAt)
    return dateB - dateA // Sắp xếp giảm dần
  })
}
