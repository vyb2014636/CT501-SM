import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchAllPosts = createAsyncThunk('post/allPost', async ({ page, userId, limit }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get(`/post`, { params: { page: page, userId: userId || undefined, limit: limit || 3 } })
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})

export const fetchPost = createAsyncThunk('post/post', async (postId, { rejectWithValue }) => {
  const response = await axiosIntercept.get(`/post/post/${postId}`)
  try {
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})

export const toggleLikePost = createAsyncThunk('post/like', async (postId, { rejectWithValue }) => {
  const response = await axiosIntercept.put('/post/like', { postId })
  if (!response.statusCode) return response
  else return rejectWithValue(response)
})
