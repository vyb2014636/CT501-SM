import { createSlice } from '@reduxjs/toolkit'
import { fetchListNotificationAPI, readNotificationAPI } from './notificationThunk'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    status: 'idle',
    error: false,
    loading: true,
    hasMoreNotifications: true,
    totalUnread: 0
  },
  reducers: {
    resetNotificationState: (state) => {
      state.notifications = []
      state.status = 'idle'
      state.error = false
      state.loading = true
      state.hasMoreNotifications = true
      state.totalUnread = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListNotificationAPI.pending, (state) => {
      state.status = 'loading'
      state.loading = true
      state.error = true
    })
    builder.addCase(fetchListNotificationAPI.fulfilled, (state, action) => {
      state.notifications = [...state.notifications, ...action.payload.notifications]
      state.status = 'succeed'
      state.loading = false
      state.error = false
      state.hasMoreNotifications = action.payload.hasMoreNotifications
      state.totalUnread = action.payload.totalUnread
    })
    builder.addCase(fetchListNotificationAPI.rejected, (state) => {
      state.status = 'failed'
      state.loading = false
      state.error = true
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
