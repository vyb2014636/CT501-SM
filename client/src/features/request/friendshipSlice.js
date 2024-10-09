// friendSlice.js
import axiosIntercept from '@/apis/axiosIntercept'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { acceptFriendRequest, cancelFriendRequest, rejectFriendRequest, sendFriendRequest, unFriend } from './requestThunk'

export const checkFriendshipStatus = createAsyncThunk('friend/checkFriendshipStatus', async (checkUserId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get(`requestFriend/friendship/${checkUserId}`)
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
})

const friendshipSlice = createSlice({
  name: 'friendship',
  initialState: {
    status: null,
    loadingFriendship: true,
    error: null
  },
  reducers: {
    resetFriendship: (state) => {
      state.status = null
      state.loadingFriendship = true
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkFriendshipStatus.pending, (state) => {
        state.loadingFriendship = true
      })
      .addCase(checkFriendshipStatus.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.loadingFriendship = false
      })
      .addCase(checkFriendshipStatus.rejected, (state, action) => {
        state.error = action.payload
        state.loadingFriendship = false
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.status = action.payload.request.status
      })
      .addCase(unFriend.fulfilled, (state, action) => {
        state.status = action.payload.request.status
      })
      .addCase(cancelFriendRequest.fulfilled, (state, action) => {
        state.status = action.payload.request.status
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.status = action.payload.request.status
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.status = action.payload.request.status
      })
  }
})

export const { resetFriendship } = friendshipSlice.actions

export default friendshipSlice.reducer
