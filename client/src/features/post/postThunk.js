import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchAllUserPosts = createAsyncThunk('post/allUserPost', async ({ page, userId }, { rejectWithValue }) => {
  const response = await axiosIntercept.get(`post/${userId}`, { params: { page: page } })
  if (response) return response
  else return rejectWithValue(response)
})

export const fetchAllPosts = createAsyncThunk('post/allPost', async (page, { rejectWithValue }) => {
  const response = await axiosIntercept.get(`/post/`, { params: { page: page } })
  if (response) return response
  else return rejectWithValue(response)
})

export const toggleLikePost = createAsyncThunk('post/like', async (postId, { rejectWithValue }) => {
  const response = await axiosIntercept.put('/post/like', { postId })
  if (response) return response
  else return rejectWithValue(response)
})
