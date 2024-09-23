// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { login, logout, refreshToken } from './authThunk' // Đảm bảo đường dẫn chính xác
import { removeToken } from '@/utils/tokenHelper' // Đảm bảo import removeToken

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

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
      })
  }
})

export const { resetError, updateUser } = authSlice.actions

export default authSlice.reducer
