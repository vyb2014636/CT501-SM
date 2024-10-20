import { createSlice } from '@reduxjs/toolkit'
import { accessChat, createGroupChat, fetchChats, sendNewMessage } from './chatThunk'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    selectedChat: null,
    status: 'idle',
    loading: true
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload
    },
    resetSelect: (state) => {
      state.selectedChat = null
    },
    resetStateChat: (state) => {
      state.chats = []
      state.selectedChat = null
      state.status = 'idle'
      state.loading = true
    },
    updateLastMessage: (state, action) => {
      const chatIndex = state.chats.findIndex((chat) => chat._id === action.payload.chatID)

      if (chatIndex !== -1) {
        // Cập nhật lastMessage
        state.chats[chatIndex].latestMessage = action.payload.newMessage

        // Lưu chat vào biến tạm để di chuyển
        const [updatedChat] = state.chats.splice(chatIndex, 1) // Xóa chat khỏi vị trí cũ
        state.chats.unshift(updatedChat) // Thêm chat vào đầu mảng
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats
        state.loading = false
      })
      .addCase(fetchChats.rejected, (state) => {
        state.loading = false
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        const newChat = action.payload.chat

        const chatIndex = state.chats.findIndex((chat) => chat._id === newChat._id)

        if (chatIndex !== -1) state.chats[chatIndex] = newChat

        state.selectedChat = newChat
        state.loading = false
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        const chatIndex = state.chats.findIndex((chat) => chat._id === action.payload.chatId)

        if (chatIndex !== -1) {
          // Cập nhật lastMessage
          state.chats[chatIndex].latestMessage = action.payload.newMessage

          // Lưu chat vào biến tạm để di chuyển
          const [updatedChat] = state.chats.splice(chatIndex, 1) // Xóa chat khỏi vị trí cũ
          state.chats.unshift(updatedChat) // Thêm chat vào đầu mảng
        }
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chats.unshift(action.payload.groupChat)
      })
  }
})

export const { resetSelect, selectChat, resetStateChat, updateLastMessage } = chatSlice.actions

export default chatSlice.reducer
