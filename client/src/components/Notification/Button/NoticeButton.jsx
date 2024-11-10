import React, { useState } from 'react'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationList from '../List/NotificationList'
import { useSelector } from 'react-redux'

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
