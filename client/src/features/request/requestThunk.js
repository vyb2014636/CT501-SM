// requestSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRequests, cancelAddFriendAPI, acceptAddFriendAPI, rejectAddFriendAPI, sendFriendAPI, unFriendAPI } from '@/apis/user/userAPI'
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

export const acceptFriendRequest = createAsyncThunk('requests/accept', async (userId, { rejectWithValue }) => {
  try {
    const response = await acceptAddFriendAPI(userId)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const rejectFriendRequest = createAsyncThunk('requests/reject', async (userId, { rejectWithValue }) => {
  try {
    const response = await rejectAddFriendAPI(userId)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const cancelFriendRequest = createAsyncThunk('requests/cancel', async (userId, { rejectWithValue }) => {
  try {
    const response = await cancelAddFriendAPI(userId)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const sendFriendRequest = createAsyncThunk('requests/send', async (userId, { rejectWithValue }) => {
  try {
    const response = await sendFriendAPI(userId)
    console.log(response)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const unFriend = createAsyncThunk('requests/unfriend', async (userId, { rejectWithValue }) => {
  try {
    const response = await unFriendAPI(userId)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
