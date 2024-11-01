import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Badge, Tooltip, Menu, Typography, MenuItem, Box, Skeleton } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationList from '../List/NotificationList'

const NoticeButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { notifications, loading, hasMoreNotifications, totalUnread } = useSelector((state) => state.notification)

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)
  return (
    <>
      <Tooltip title='Thông báo'>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={totalUnread} color='primary'>
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
        <NotificationList notifications={notifications} loading={loading} hasMoreNotifications={hasMoreNotifications} />
      </Menu>
    </>
  )
}

export default NoticeButton
