// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, toggleLikePost } from './postThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    totalPosts: 0,
    status: 'idle',
    message: null,
    userPosts: null,
    error: false,
    loading: true,
    hasMorePosts: true
  },
  reducers: {
    resetPostState: (state) => {
      state.posts = []
      state.totalPosts = 0
      state.status = null
      state.message = null
      state.userPosts = null
      state.loading = true
      state.hasMorePosts = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.posts]
        state.status = 'succeeded'
        state.totalPosts = action.payload.totalPosts
        state.userPosts = action.payload.user
        state.error = false
        state.loading = false
        state.hasMorePosts = action.payload.hasMorePosts
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.message
        state.userPosts = null
        state.loading = false
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload.updatePost
        const index = state.posts.findIndex((post) => post._id === updatedPost._id)

        if (index !== -1) {
          state.posts[index] = updatedPost
        }
      })
  }
})

export const { resetPostState } = postSlice.actions
export default postSlice.reducer
