import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircleIcon from '@mui/icons-material/Circle'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { useDispatch } from 'react-redux'
import { readNotificationAPI } from '@/features/notification/notificationThunk'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'
import { toast } from 'react-toastify'

const NotificationCard = ({ notification }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleProfileClick = useProfileNavigation()

  // Hàm render thông báo
  const renderNotificationMessage = (notification) => {
    const { sender, type, status } = notification
    const messages = {
      friendRequestAccepted: ' đã chấp nhận lời mời kết bạn của bạn.',
      friendRequestReject: ' đã từ chối lời mời kết bạn của bạn.',
      newPost: ' đã đăng một bài viết mới.',
      sharedPost: ' đã chia sẻ một bài viết.',
      hiddenPost: ': bài đăng của bạn đã bị ẩn do bị vi phạm',
      restorePost: ': bài đăng của bạn đã được phục hồi',
      dissolve: 'đã bị giải tán',
      removeGroup: 'Bạn đã bị xóa khỏi nhóm'
    }
    return (
      <Typography variant='body2' sx={{ marginLeft: 1, fontWeight: status === 'unread' ? 'bold' : 'normal', whiteSpace: 'normal' }}>
        <strong>{sender.isAdmin ? 'Hệ thống' : sender.fullname}</strong>
        {messages[type]}
      </Typography>
    )
  }

  // Hàm điều hướng khi người dùng nhấn vào thông báo
  const handleNavigate = (notification) => {
    const { type, sender, postId, status, reportId } = notification
    const from = sender && sender._id ? sender._id : null
    if (status === 'unread') dispatch(readNotificationAPI(notification._id))

    switch (type) {
      case 'friendRequestAccepted':
      case 'friendRequestReject':
        handleProfileClick(from)
        break
      case 'hiddenPost':
        navigate(`/post/${postId._id}`, { state: { reportId: reportId } })
        break
      case 'restorePost':
      case 'newPost':
      case 'sharedPost':
        if (!postId) toast.info('Bài đăng đã bị xóa')
        navigate(`/post/${postId._id}`)
        break
      default:
        break
    }
  }

  // Hàm xóa thông báo
  const handleDeleteNotification = (notificationId) => {
    // dispatch(deleteNotificationAPI(notificationId))
    toast.success('Đã xóa thông báo')
  }

  return (
    <MenuItem
      sx={{
        display: 'flex',
        padding: 2,
        alignItems: 'center',
        borderRadius: 0,
        position: 'relative',
        '&:hover .delete-button': { opacity: 1, bgcolor: 'background.paper' }
      }}
      onClick={() => handleNavigate(notification)}>
      <Avatar
        src={(!notification.sender.isAdmin && notification.sender.avatar) || ''}
        alt='User avatar'
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />

      <Box sx={{ flexGrow: 1 }}>
        {renderNotificationMessage(notification)}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 0.5 }}>
          <Typography variant='caption' sx={{ color: '#4caf50' }}>
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: vi })}
          </Typography>
        </Box>
      </Box>

      {/* Hiển thị nút 'X' để xóa thông báo khi hover */}
      <Box
        className='delete-button'
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          right: 0,
          opacity: 0,
          transition: 'opacity 0.1s ease'
        }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteNotification(notification._id)
          }}>
          <CloseIcon />
        </IconButton>
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
