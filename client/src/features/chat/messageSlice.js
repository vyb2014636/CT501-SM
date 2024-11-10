import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages, sendNewMessage } from './chatThunk'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    chatId: null,
    messages: [],
    status: 'idle',
    loading: true
  },
  reducers: {
    receiveMessage: (state, action) => {
      if (state.chatId === action.payload.chatId) state.messages.push(action.payload.newMessage)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages
        state.chatId = action.payload.chatId
        state.loading = false
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false
      })
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.newMessage)
      })
  }
})
export const { receiveMessage } = messageSlice.actions

export default messageSlice.reducer
