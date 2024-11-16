import React from 'react'
import { useSelector } from 'react-redux'
import StyledBadge from '../StyledBadge'
import { Avatar } from '@mui/material'

const StyledAvatar = ({ user, chat = null, style, handleOnclick, styleBadge }) => {
  const onlineUsers = useSelector((state) => state.online.onlineUsers)

  const isOnline = onlineUsers[user?._id] === true // Kiểm tra xem key có tồn tại và giá trị là true

  return isOnline && !chat?.isGroupChat ? (
    <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' sx={styleBadge}>
      <Avatar src={chat?.isGroupChat ? chat?.avatar : user?.avatar} sx={style} onClick={handleOnclick} />
    </StyledBadge>
  ) : (
    <Avatar src={chat?.isGroupChat ? chat?.avatar : user?.avatar} sx={style} onClick={handleOnclick} />
  )
}

export default StyledAvatar
