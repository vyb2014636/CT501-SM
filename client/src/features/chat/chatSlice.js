import { createSlice } from '@reduxjs/toolkit'
import { accessChat, createGroupChat, fetchChats } from './chatThunk'

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
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        const newChat = action.payload.chat
        // Kiểm tra xem cuộc trò chuyện đã có trong state.chats chưa
        const chatExists = state.chats.some((chat) => chat._id === newChat._id)

        if (!chatExists) state.chats.unshift(newChat)

        state.selectedChat = newChat
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chats.unshift(action.payload.groupChat)
      })
  }
})

export const {} = chatSlice.actions

export default chatSlice.reducer
