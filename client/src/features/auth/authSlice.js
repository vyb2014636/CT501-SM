// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { login, logout, refreshToken } from './authThunk' // Đảm bảo đường dẫn chính xác
import { removeToken } from '@/utils/tokenHelper' // Đảm bảo import removeToken
import { acceptFriendRequest, unFriend } from '../request/requestThunk'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    status: 'idle',
    error: null,
    loading: false,
    isAuthenticated: false
  },
  reducers: {
    resetError(state) {
      state.status = 'idle'
      state.error = null
    },
    updateUser(state, action) {
      state.user = action.payload
    },
    updateFriends(state, action) {
      const { user, actionType } = action.payload // Giả sử payload chứa userId và actionType

      if (actionType === 'add') {
        state.user.friends.push(user)
      } else if (actionType === 'remove') {
        state.user.friends = state.user.friends.filter((friend) => friend._id !== user._id) // Xóa bạn khỏi danh sách
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.isAuthenticated = false
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.user = user
        state.status = 'succeeded'
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.error = null
        removeToken('accessToken')
        removeToken('refreshToken')
        state.status = 'idle'
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.user.friends.push(action.payload.request.from)
      })
      .addCase(unFriend.fulfilled, (state, action) => {
        state.user.friends = state.user.friends.filter((friend) => friend._id !== action.payload.request.to._id) // Xóa bạn khỏi danh sách
      })
  }
})

export const { resetError, updateUser, updateFriends } = authSlice.actions

export default authSlice.reducer
