import React, { useRef, useState } from 'react'
import { IconButton, Badge, Tooltip, Menu, Typography, MenuItem, Box, Skeleton } from '@mui/material'
import NotificationCard from '@/components/Notification/Card/NotificationCard'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import { useDispatch } from 'react-redux'

const NotificationList = ({ notifications, loading, hasMoreNotifications }) => {
  const dispatch = useDispatch()
  const notificationRef = useRef(null)
  const [page, setPage] = useState(1)

  const loadMoreNotifications = () => {
    if (hasMoreNotifications && !loading) {
      setPage((prevPage) => prevPage + 1)
      dispatch(fetchListNotificationAPI({ page: page + 1 }))
    }
  }
  useScrollInfinite(notificationRef, loadMoreNotifications, hasMoreNotifications)

  return (
    <Box sx={{ minWidth: 350, maxHeight: 350, maxWidth: 440, width: 350, ...scrollbarStyleMui }} ref={notificationRef}>
      <Typography variant='h6' color='primary' p={2}>
        Danh sách thông báo{' '}
      </Typography>

      {loading && notifications.length === 0 ? (
        <MenuItem>
          <Typography variant='body2'>...loading</Typography>
        </MenuItem>
      ) : notifications.length === 0 ? (
        <MenuItem>
          <Typography variant='body2'>Không có thông báo nào</Typography>
        </MenuItem>
      ) : (
        <>
          {notifications.map((notification) => (
            <NotificationCard key={notification._id} notification={notification} />
          ))}

          {!loading && notifications.length !== 0 && (
            <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
              Đã hết thông báo
            </Typography>
          )}
          {loading && notifications.length > 0 && <Skeleton variant='rectangular' width='100%' height={60} animation='wave' />}
        </>
      )}
    </Box>
  )
}

export default NotificationList
