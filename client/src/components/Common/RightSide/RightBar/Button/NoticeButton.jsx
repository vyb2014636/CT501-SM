import React, { useState } from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { Avatar, List, ListItem, ListItemText, Menu, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { useDispatch, useSelector } from 'react-redux'
import { readNotificationAPI } from '@/features/notification/notificationThunk'
import { scrollbarStyleMui } from '@/styles/styles'

const NoticeButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openNotification, setOpenNotification] = useState(null)
  const open = Boolean(openNotification)
  const { notifications } = useSelector((state) => state.notification)
  const unreadCount = notifications.filter((notification) => notification.status === 'unread')?.length

  const handleOpenNotification = (e) => setOpenNotification(e.currentTarget)

  const handleNotificationClick = (type, targetId, notificationId, postId) => {
    dispatch(readNotificationAPI(notificationId))
    handleNavigate(type, targetId, postId)
  }

  const handleNavigate = (type, targetId, postId) => {
    switch (type) {
      case 'friendRequestAccepted':
      case 'friendRequestReject':
        useProfileNavigation()(targetId)
        break
      case 'newPost':
      case 'sharedPost':
        navigate(`/post/${postId._id}`)
        break
      default:
        break
    }
  }

  const getNotificationStyle = (status) => ({
    fontWeight: status === 'unread' ? 'bold' : 'normal'
  })

  const renderNotificationMessage = (notification) => {
    const { sender, type, status } = notification
    const messages = {
      friendRequestAccepted: ' đã chấp nhận lời mời kết bạn của bạn.',
      friendRequestReject: ' đã từ chối lời mời kết bạn của bạn.',
      newPost: ' đã đăng một bài viết mới.',
      sharedPost: ' đã chia sẻ một bài viết.'
    }
    return (
      <FlexRow>
        <Avatar src={sender.avatar} sx={{ width: 40, height: 40 }} />
        <Typography sx={{ marginLeft: 1, ...getNotificationStyle(status) }}>{sender.fullname + (messages[type] || ' đã gửi thông báo.')}</Typography>
      </FlexRow>
    )
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
        <List sx={{ width: '100%', maxWidth: 350, maxHeight: 400, bgcolor: 'background.paper', ...scrollbarStyleMui }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem
                button
                key={notification._id}
                onClick={() => handleNotificationClick(notification.type, notification.sender._id, notification._id, notification.postId)}
                sx={getNotificationStyle(notification.status)}>
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
