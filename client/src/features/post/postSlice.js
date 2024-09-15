// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, fetchAllUserPosts, toggleLikePost } from './postThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    totalPosts: 0,
    status: null,
    message: null,
    userPosts: null // Thông tin của người đăng trong profile
  },
  reducers: {
    resetPostState: (state) => {
      state.posts = []
      state.totalPosts = 0
      state.status = null
      state.message = null
      state.userPosts = null // Thông tin của người đăng trong profile
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.posts]
        state.status = 'succeeded'
        state.totalPosts = action.payload.totalPosts
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
      })
      .addCase(fetchAllUserPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllUserPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.posts]
        state.status = 'succeeded'
        state.totalPosts = action.payload.totalPosts
        state.userPosts = action.payload.user
      })
      .addCase(fetchAllUserPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.error.message
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
