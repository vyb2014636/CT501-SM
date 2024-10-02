import React, { useState } from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { Avatar, List, ListItem, ListItemText, Menu, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@/hooks/useNotifications'
import FlexRow from '../Flex/FlexRow'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'

const NoticeButton = () => {
  const [openNotification, setOpenNotification] = useState(null)
  const { notifications, fetchNotifications, markAsRead, unreadCount } = useNotifications()
  const open = Boolean(openNotification)
  const handleProfileClick = useProfileNavigation()
  const navigate = useNavigate()

  const handleOpenNotification = async (e) => {
    setOpenNotification(e.currentTarget)
    await fetchNotifications()
  }

  const handleNotificationClick = (type, targetId, notificationId, postId) => {
    markAsRead(notificationId)
    handleNavigate(type, targetId, postId)
  }

  const handleNavigate = (type, targetId, postId) => {
    switch (type) {
      case 'friendRequestAccepted':
        handleProfileClick(targetId)
        break
      case 'friendRequestReject':
        handleProfileClick(targetId)
        break
      case 'newPost':
        navigate(`/post/${postId._id}`)
        break
      case 'sharedPost':
        navigate(`/post/${postId._id}`)
        break
      default:
        break
    }
  }

  const renderContentMessage = (user, message) => {
    return (
      <FlexRow>
        <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
        <Typography> {user.fullname + message}</Typography>
      </FlexRow>
    )
  }

  const renderNotificationMessage = (notification) => {
    switch (notification.type) {
      case 'friendRequestAccepted':
        return renderContentMessage(notification.sender, ' đã chấp nhận lời mời kết bạn của bạn.')
      case 'friendRequestReject':
        return renderContentMessage(notification.sender, ' đã từ chối lời mời kết bạn của bạn.')

      case 'newPost':
        return renderContentMessage(notification.sender, ' đã đăng một bài viết mới.')

      case 'sharedPost':
        return renderContentMessage(notification.sender, ' đã chia sẻ một bài viết.')

      default:
        return 'Thông báo không xác định'
    }
  }

  return (
    <>
      <Tooltip title='Thông báo' onClick={handleOpenNotification}>
        <IconButton>
          <Badge badgeContent={unreadCount} color='primary'>
            <NotificationsNoneOutlinedIcon color='primary' />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={openNotification}
        open={open}
        onClose={() => setOpenNotification(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem
                key={notification._id}
                button
                onClick={() => handleNotificationClick(notification.type, notification.sender._id, notification._id, notification.postId)}
                style={{ backgroundColor: notification.status === 'read' ? 'background.paper' : 'background.default' }}>
                <ListItemText primary={renderNotificationMessage(notification)} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary='Không có thông báo nào' />
            </ListItem>
          )}
        </List>
      </Menu>
    </>
  )
}

export default NoticeButton
