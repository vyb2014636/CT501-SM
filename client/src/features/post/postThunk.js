import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchAllPosts = createAsyncThunk('post/allPost', async ({ page, userId }, { rejectWithValue }) => {
  const response = await axiosIntercept.get(`/post`, { params: { page: page, userId: userId || undefined } })
  if (!response.statusCode) return response
  else return rejectWithValue(error)
})

export const toggleLikePost = createAsyncThunk('post/like', async (postId, { rejectWithValue }) => {
  const response = await axiosIntercept.put('/post/like', { postId })
  if (!response.statusCode) return response
  else return rejectWithValue(response)
})
