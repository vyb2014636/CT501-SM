// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const onlineSlice = createSlice({
  name: 'online',
  initialState: {
    onlineUsers: {}
  },
  reducers: {
    setUserOnline: (state, action) => {
      state.onlineUsers[action.payload] = true
    },
    setUserOffline: (state, action) => {
      delete state.onlineUsers[action.payload]
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = {}
      action.payload.forEach((user) => {
        state.onlineUsers[user._id] = true // Đặt trạng thái cho tất cả người dùng online
      })
    }
  }
})

export const { setUserOnline, setUserOffline, setOnlineUsers } = onlineSlice.actions

export default onlineSlice.reducer
