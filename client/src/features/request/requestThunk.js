// requestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequests, acceptAddFriendAPI, rejectAddFriendAPI, cancelAddFriendAPI } from '@/apis/user/userAPI'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchFriendRequests = createAsyncThunk('requests/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await getRequests()
    return response.listRequest
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchSentFriendRequests = createAsyncThunk('requests/fetchsent', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get('requestFriend/sent')
    return response.listRequest
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const acceptFriendRequest = createAsyncThunk('requests/accept', async (requestId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('requestFriend/acceptRequest', { requestId: requestId })
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const rejectFriendRequest = createAsyncThunk('requests/reject', async (requestId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('requestFriend/rejectRequest', { requestId: requestId })
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const cancelFriendRequest = createAsyncThunk('requests/cancel', async (requestId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('requestFriend/cancelRequest', { requestId })
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const sendFriendRequest = createAsyncThunk('requests/send', async (to, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('requestFriend/sendRequest', to)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
