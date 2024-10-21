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
    }
  }
})

export const { setUserOnline, setUserOffline } = onlineSlice.actions

export default onlineSlice.reducer
