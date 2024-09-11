import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'
import { setToken } from '@/utils/tokenHelper'

export const fetchAllPosts = createAsyncThunk('post/allPost', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.get('/post/')
  if (response) return response
  else return rejectWithValue(response)
})
