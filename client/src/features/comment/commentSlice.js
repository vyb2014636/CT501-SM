// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { addComment, addReplyForComment, fetchComments, likeComment, likeReply } from './commentThunk'

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    status: 'idle',
    error: false,
    loading: true,
    hasMoreComments: true,
    ofPost: null
  },
  reducers: {
    resetCommentState: (state) => {
      state.comments = []
      state.status = 'idle'
      state.error = false
      state.loading = true
      state.hasMoreComments = true
      state.ofPost = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = [...state.comments, ...action.payload.comments]
        state.status = 'succeeded'
        state.error = false
        state.loading = false
        state.hasMoreComments = action.payload.hasMoreComments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed'
        state.message = action.message
        state.loading = false
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = action.payload.post.comments
        state.status = 'succeeded'
        state.error = false
        state.loading = false
      })
      .addCase(addReplyForComment.fulfilled, (state, action) => {
        const { _id, replies } = action.payload
        const comment = state.comments.find((c) => c._id === _id)
        if (comment) {
          comment.replies = replies
        }
      })

      .addCase(likeComment.fulfilled, (state, action) => {
        const { updatedComment } = action.payload
        const comment = state.comments.find((comment) => comment._id === updatedComment._id)
        if (comment) {
          comment.likes = updatedComment.likes
        }
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        const { updatedComment, updatedReply } = action.payload
        const comment = state.comments.find((comment) => comment._id === updatedComment._id)
        if (comment) {
          const reply = comment.replies.find((r) => r._id === updatedReply._id)
          if (reply) {
            reply.likes = updatedReply.likes
          }
        }
      })
  }
})

export const { resetCommentState } = commentSlice.actions
export default commentSlice.reducer
