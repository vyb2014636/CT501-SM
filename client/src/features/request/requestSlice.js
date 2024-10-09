import { acceptFriendRequest, fetchFriendRequests, rejectFriendRequest, sendFriendRequest } from './requestThunk'
import { createSlice } from '@reduxjs/toolkit'

// Slice
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
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
        state.requests = action.payload
        state.loading = false
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((req) => req._id !== action.payload.request._id)
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((req) => req._id !== action.payload.request._id)
      })
  }
})

export default requestSlice.reducer
