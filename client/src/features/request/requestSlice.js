import { acceptFriendRequest, cancelFriendRequest, fetchFriendRequests, rejectFriendRequest, sendFriendRequest } from './requestThunk'
import { createSlice } from '@reduxjs/toolkit'

// Slice
const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
    sends: [],
    loading: false,
    error: null
  },
  reducers: {
    pushListRequests: (state, action) => {
      state.requests.push(action.payload)
    },
    removeListRequests: (state, action) => {
      state.requests = state.requests.filter((req) => req._id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.requests = action.payload.requests
        state.sends = action.payload.sends
        state.loading = false
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((req) => req._id !== action.payload.request._id)
      })
      .addCase(cancelFriendRequest.fulfilled, (state, action) => {
        state.sends = state.sends.filter((req) => req._id !== action.payload.request._id)
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.sends.push(action.payload.request)
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((req) => req._id !== action.payload.request._id)
      })
  }
})
export const { pushListRequests } = requestSlice.actions

export default requestSlice.reducer
