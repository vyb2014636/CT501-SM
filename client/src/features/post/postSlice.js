// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchAllPosts, fetchPost, toggleLikePost } from './postThunk'
import { addComment, addReplyForComment } from '../comment/commentThunk'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    viewPost: null,
    totalPosts: 0,
    status: 'idle',
    message: null,
    userPosts: null,
    error: false,
    loading: true,
    hasMorePosts: true
  },
  reducers: {
    selectViewPost: (state, action) => {
      state.viewPost = action.payload
    },
    resetPostState: (state) => {
      state.posts = []
      state.totalPosts = 0
      state.status = null
      state.viewPost = null
      state.message = null
      state.userPosts = null
      state.loading = true
      state.hasMorePosts = true
    },
    searchPosts: (state, action) => {
      state.posts = action.payload
      state.status = 'succeeded'
      state.error = false
      state.loading = false
    },
    updatedPost: (state, action) => {
      const index = state.posts.findIndex((post) => post._id === action.payload.post._id)

      if (index !== -1) {
        if (action.payload.action === 'trash') {
          //Đưa bài đăng vào thùng rác
          state.posts.splice(index, 1)
        } else {
          //Cập nhật bài đăng
          state.posts[index] = action.payload.post
        }
      }

      // else {
      //   //Phục hồi bài đăng
      //   let insertIndex = state.posts.findIndex((post) => new Date(post.createdAt) < new Date(action.payload.post.createdAt))
      //   if (insertIndex === -1) {
      //     insertIndex = state.posts?.length
      //   }

      //   state.posts.splice(insertIndex, 0, action.payload.post)
      // }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload.post._id)
        if (index !== -1) state.posts[index] = action.payload.post

        state.status = 'succeeded'
        state.error = false
        state.loading = false
      })
      .addCase(addReplyForComment.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload.post._id)

        if (index !== -1) state.posts[index] = action.payload.post

        state.status = 'succeeded'
        state.error = false
        state.loading = false
      })
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
        state.error = true
        state.message = action.message
        state.userPosts = null
        state.loading = false
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.viewPost = action.payload.post
        state.userPosts = action.payload.post.byPost
        state.status = 'succeeded'
        state.error = false
        state.loading = false
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = true
        state.message = action.message
        state.loading = false
      })

      .addCase(toggleLikePost.fulfilled, (state, action) => {
        if (state.viewPost) {
          state.viewPost = action.payload.updatePost
        } else {
          const updatedPost = action.payload.updatePost
          const index = state.posts.findIndex((post) => post._id === updatedPost._id)
          if (index !== -1) state.posts[index] = updatedPost
        }
      })
  }
})

export const { resetPostState, searchPosts, updatedPost, selectViewPost } = postSlice.actions
export default postSlice.reducer
