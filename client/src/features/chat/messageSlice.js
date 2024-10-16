import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages, sendNewMessage } from './chatThunk'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    status: 'idle',
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages
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

export default messageSlice.reducer
