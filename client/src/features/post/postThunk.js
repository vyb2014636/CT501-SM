import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchAllPosts = createAsyncThunk('post/allPost', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.get('/post/')
  if (response) return response
  else return rejectWithValue(response)
})

export const toggleLikePost = createAsyncThunk('post/like', async (postId, { rejectWithValue }) => {
  const response = await axiosIntercept.put('/post/like', { postId })
  if (response) return response
  else return rejectWithValue(response)
})
