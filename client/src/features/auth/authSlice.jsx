// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginPost } from './authThunk' // Đảm bảo đường dẫn chính xác
import { getToken, setToken, removeToken } from '@/utils/tokenHelper' // Đảm bảo import removeToken

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: getToken('refreshToken'),
    status: 'idle',
    error: null,
    loading: false // Đảm bảo có biến loading
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      removeToken('accessToken')
      removeToken('refreshToken')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginPost.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.user = user
        state.status = 'succeeded'
        state.error = 'login succeeded'
        state.loading = false // Cập nhật trạng thái loading
      })
      .addCase(loginPost.rejected, (state, action) => {
        state.loading = false // Cập nhật trạng thái loading
        state.error = null
      })

    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    // })
  }
})

export const { logout, login } = authSlice.actions
export default authSlice.reducer
