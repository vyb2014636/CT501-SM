import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchListNotificationAPI = createAsyncThunk('notification/getNotice', async ({ page }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get('notification/', { params: { page: page || 1 } })

    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})

export const readNotificationAPI = createAsyncThunk('notification/read', async (notificationId, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.put('notification/', { notificationId: notificationId })
    return response
  } catch (error) {
    rejectWithValue(error.message)
  }
})
