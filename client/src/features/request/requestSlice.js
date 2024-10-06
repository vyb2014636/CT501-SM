import {
  acceptFriendRequest,
  cancelFriendRequest,
  fetchFriendRequests,
  fetchSentFriendRequests,
  rejectFriendRequest,
  sendFriendRequest
} from './requestThunk'
import { createSlice } from '@reduxjs/toolkit'

// Slice
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    receivedRequests: [],
    sentRequests: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.receivedRequests = action.payload
        state.loading = false
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchSentFriendRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSentFriendRequests.fulfilled, (state, action) => {
        state.sentRequests = action.payload
        state.loading = false
      })
      .addCase(fetchSentFriendRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.receivedRequests = state.receivedRequests.filter((req) => req._id !== action.payload.request._id)
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.receivedRequests = state.receivedRequests.filter((req) => req._id !== action.payload.request._id)
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.sentRequests = state.sentRequests.push(action.payload.request)
      })
      .addCase(cancelFriendRequest.fulfilled, (state, action) => {
        state.receivedRequests = state.sentRequests.filter((req) => req._id !== action.payload.request._id)
      })
  }
})

export default requestSlice.reducer
