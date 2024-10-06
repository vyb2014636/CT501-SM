// friendSlice.js
import axiosIntercept from '@/apis/axiosIntercept'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const checkFriendshipStatus = createAsyncThunk('friend/checkFriendshipStatus', async (checkUserId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get(`requestFriend/friendship/${checkUserId}`)
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
})

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    status: null,
    requestId: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkFriendshipStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(checkFriendshipStatus.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.requestId = action.payload.requestId
        state.loading = false
      })
      .addCase(checkFriendshipStatus.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  }
})

export default friendSlice.reducer
