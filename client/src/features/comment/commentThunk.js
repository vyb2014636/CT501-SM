import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchComments = createAsyncThunk('post/getComments', async ({ postId, page }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get('post/comments', { params: { postId, page } })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})

export const addComment = createAsyncThunk('post/addComment', async ({ postId, content }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('post/addComment', { postId: postId, content: content })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})

// export const fetchRepliesForComment = createAsyncThunk('post/replies', async ({ postId, commentId, page }, { rejectWithValue }) => {
//   try {
//     const response = await axiosIntercept.get('post/comments/replies', { params: { postId, commentId, page } })
//     return response
//   } catch (error) {
//     rejectWithValue(error.message)
//   }
// })

export const addReplyForComment = createAsyncThunk('post/addReply', async ({ postId, commentId, content }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('post/addReply', { postId: postId, commentId: commentId, content: content })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})
export const likeComment = createAsyncThunk('post/likeComment', async ({ postId, commentId }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.put('post/likeComment', { postId: postId, commentId: commentId })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})
export const likeReply = createAsyncThunk('post/likeReply', async ({ postId, commentId, replyId }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.put('post/likeReply', { postId: postId, commentId: commentId, replyId: replyId })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})
