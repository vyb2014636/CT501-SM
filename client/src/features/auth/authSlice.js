// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginPost, logout } from './authThunk' // Đảm bảo đường dẫn chính xác
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
      .addCase(loginPost.pending, (state) => {
        state.loading = true
      })
      .addCase(loginPost.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.user = user
        state.status = 'succeeded'
        state.error = action.payload.message
        state.loading = false // Cập nhật trạng thái loading
      })
      .addCase(loginPost.rejected, (state, action) => {
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

    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    // })
  }
})

export const {} = authSlice.actions
export default authSlice.reducer
