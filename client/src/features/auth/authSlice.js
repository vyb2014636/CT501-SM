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
    loading: false // Đảm bảo có biến loading
  },
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   state.accessToken = null
    //   state.refreshToken = null
    //   state.error = null
    //   removeToken('accessToken')
    //   removeToken('refreshToken')
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.user = user
        state.status = 'succeeded'
        state.error = action.payload.message
        state.loading = false // Cập nhật trạng thái loading
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false // Cập nhật trạng thái loading
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
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
      })
  }
})

export const {} = authSlice.actions
export default authSlice.reducer
