import { Avatar, Box, MenuItem, Typography } from '@mui/material'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle'
import { useNavigate } from 'react-router-dom'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { useDispatch } from 'react-redux'
import { readNotificationAPI } from '@/features/notification/notificationThunk'

const NotificationCard = ({ notification }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleProfileClick = useProfileNavigation()

  const renderNotificationMessage = (notification) => {
    const { sender, type, status } = notification
    const messages = {
      friendRequestAccepted: ' đã chấp nhận lời mời kết bạn của bạn.',
      friendRequestReject: ' đã từ chối lời mời kết bạn của bạn.',
      newPost: ' đã đăng một bài viết mới.',
      sharedPost: ' đã chia sẻ một bài viết.'
    }
    return (
      <Typography variant='body2' sx={{ marginLeft: 1, fontWeight: status === 'unread' ? 'bold' : 'normal' }}>
        <strong>{sender.fullname}</strong>
        {messages[type]}
      </Typography>
    )
  }

  const handleNavigate = (type, from, notificationId, postId) => {
    dispatch(readNotificationAPI(notificationId))
    switch (type) {
      case 'friendRequestAccepted':
      case 'friendRequestReject':
        handleProfileClick(from)
        break
      case 'newPost':
      case 'sharedPost':
        navigate(`/post/${postId._id}`)
        break
      default:
        break
    }
  }

  return (
    <MenuItem
      sx={{ display: 'flex', padding: 2, alignItems: 'center', borderRadius: 0 }}
      onClick={() => handleNavigate(notification.type, notification.sender._id, notification._id, notification.postId)}>
      <Avatar src={notification.sender.avatar} alt='User avatar' sx={{ width: 50, height: 50, marginRight: 2 }} />

      <Box sx={{ flexGrow: 1 }}>
        {renderNotificationMessage(notification)}

        {/* Time, reactions, comments */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.5 }}>
          <Typography variant='caption' sx={{ color: '#4caf50' }}>
            {notification.createdAt}
          </Typography>
          {/* <Typography variant='caption'>• 38 cảm xúc</Typography>
          <Typography variant='caption'>• 11 bình luận</Typography> */}
        </Box>
      </Box>

      {/* Icons */}
      {notification.status === 'unread' && (
        <Box>
          <CircleIcon fontSize='small' sx={{ color: '#3f51b5' }} />
        </Box>
      )}
    </MenuItem>
  )
}

export default NotificationCard
