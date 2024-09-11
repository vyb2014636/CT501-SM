// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts } from './postThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    status: null,
    message: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts
      state.status = null
    })
  }
})

export default postSlice.reducer
