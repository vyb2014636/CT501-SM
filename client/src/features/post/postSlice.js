// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, toggleLikePost } from './postThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    totalPosts: 0,
    status: null,
    page: 1,
    message: null
  },
  reducers: {
    incrementPage(state) {
      state.page += 1
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts]
      state.status = 'succeed'
      state.totalPosts = action.payload.totalPosts
    })
    builder.addCase(toggleLikePost.fulfilled, (state, action) => {
      const updatedPost = action.payload.updatePost
      const index = state.posts.findIndex((post) => post._id === updatedPost._id) //Tìm cái post mình bấm like/dislike

      if (index !== -1) state.posts[index] = updatedPost
    })
  }
})
export const { incrementPage } = postSlice.actions

export default postSlice.reducer
