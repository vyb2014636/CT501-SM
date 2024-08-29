// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { loginPost } from './authThunk' // Đảm bảo đường dẫn chính xác
import { getToken, setToken, removeToken } from '@/utils/tokenHelper' // Đảm bảo import removeToken

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    listPosts: null,
    message: null
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.error = null
      removeToken('accessToken')
      removeToken('refreshToken')
    }
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

    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    // })
  }
})

export const { logout, login } = postSlice.actions
export default postSlice.reducer
