// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, toggleLikePost } from './postThunk'

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
    builder.addCase(toggleLikePost.fulfilled, (state, action) => {
      const updatedPost = action.payload.updatePost
      const index = state.posts.findIndex((post) => post._id === updatedPost._id) //Tìm cái post mình bấm like/dislike

      if (index !== -1) state.posts[index] = updatedPost
    })
  }
})

export default postSlice.reducer
