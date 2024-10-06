// src/features/postSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchListNotificationAPI, readNotificationAPI } from './notificationThunk'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    status: 'idle',
    error: false,
    loading: true,
    hasMoreNotifications: true
  },
  reducers: {
    resetNotificationState: (state) => {
      state.notifications = []
      state.status = 'idle'
      state.error = false
      state.loading = true
      state.hasMoreNotifications = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListNotificationAPI.pending, (state) => {
      state.status = 'loading'
      state.loading = true
      state.error = true
      state.hasMoreNotifications = true
    })
    builder.addCase(fetchListNotificationAPI.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications
      state.status = 'succeed'
      state.loading = false
      state.error = false
      // state.hasMoreNotifications = true
    })
    builder.addCase(fetchListNotificationAPI.rejected, (state) => {
      state.status = 'failed'
      state.loading = true
      state.error = true
      // state.hasMoreNotifications = true
    })
    builder.addCase(readNotificationAPI.fulfilled, (state, action) => {
      const updatedNotification = action.payload.notification
      const index = state.notifications.findIndex((notification) => notification._id === updatedNotification._id)
      if (index !== -1) state.notifications[index] = updatedNotification
    })
  }
})

export const { resetNotificationState } = notificationSlice.actions
export default notificationSlice.reducer
