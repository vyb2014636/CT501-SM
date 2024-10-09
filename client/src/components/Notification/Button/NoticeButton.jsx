import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Badge, Tooltip, Menu, Typography, MenuItem, Box } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationCard from '@/components/Notification/Card/NotificationCard'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import { scrollbarStyleMui } from '@/styles/styles'

const NoticeButton = () => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const open = Boolean(anchorEl)
  const notificationRef = useRef(null)
  const { notifications, loading, hasMoreNotifications } = useSelector((state) => state.notification)
  const unreadCount = notifications.filter((notification) => notification.status === 'unread').length
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    dispatch(resetNotificationState())
    dispatch(fetchListNotificationAPI({ page: 1 })) // Fetch the first page when opening the menu
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const loadMoreNotifications = () => {
    if (hasMoreNotifications && !loading) {
      setPage((prevPage) => prevPage + 1)
      dispatch(fetchListNotificationAPI({ page: page + 1 }))
    }
  }

  useScrollInfinite(notificationRef, loadMoreNotifications, hasMoreNotifications)

  return (
    <>
      <Tooltip title='Thông báo'>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={unreadCount} color='primary'>
            <NotificationsNoneOutlinedIcon color='primary' />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          style: {
            overflow: 'hidden',
            width: 'auto'
          }
        }}>
        <Box sx={{ maxHeight: 350, width: 'auto', ...scrollbarStyleMui }} ref={notificationRef}>
          <Typography variant='h6'>Danh sách thông báo </Typography>

          {loading && notifications.length === 0 ? (
            <MenuItem>
              <Typography variant='body2'>...loading</Typography>
            </MenuItem>
          ) : !loading && notifications.length === 0 ? (
            <MenuItem>
              <Typography variant='body2'>Không có thông báo nào</Typography>
            </MenuItem>
          ) : (
            notifications.map((notification) => <NotificationCard key={notification._id} notification={notification} />)
          )}
        </Box>
      </Menu>
    </>
  )
}

export default NoticeButton
