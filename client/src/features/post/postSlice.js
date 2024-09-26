// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, toggleLikePost } from './postThunk'
import { addComment, fetchComments } from '../comment/commentThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    totalPosts: 0,
    status: 'idle',
    message: null,
    userPosts: null,
    error: false,
    loading: true
  },
  reducers: {
    resetPostState: (state) => {
      state.posts = []
      state.totalPosts = 0
      state.status = null
      state.message = null
      state.userPosts = null
      state.loading = true
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
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.message
        state.userPosts = null
        state.loading = false
      })
      // .addCase(fetchComments.pending, (state) => {
      //   state.status = 'loading'
      //   state.loading = true
      // })
      // .addCase(fetchComments.fulfilled, (state, action) => {
      //   const postIndex = state.posts.findIndex((post) => post._id === action.payload.post._id)
      //   if (postIndex !== -1) {
      //     state.posts[postIndex] = action.payload.post
      //   }
      // })
      // .addCase(fetchComments.rejected, (state, action) => {
      //   state.status = 'failed'
      //   state.message = action.message
      //   state.userPosts = null
      //   state.loading = false
      // })
      // .addCase(addComment.fulfilled, (state, action) => {
      //   state.comments = action.payload.post.comments
      //   state.status = 'succeeded'
      //   state.error = false
      //   state.loading = false
      // })
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
