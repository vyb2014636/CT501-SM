import React, { memo, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { isMe } from '@/utils/helpers'
import { accessChat } from '@/features/chat/chatThunk'
import { useDispatch, useSelector } from 'react-redux'
import StyledAvatar from '@/components/Common/AvatarStatus/StyledAvatar'
import socket from '@/services/socket'
import { store } from '@/redux/store'

const ConversationCard = ({ chat, selectedChat, currentUser }) => {
  const dispatch = useDispatch()
  const handleAccessChat = async (chat) => {
    dispatch(accessChat({ chatID: chat._id }))
  }
  const otherUser = chat.users.find((user) => user._id !== currentUser._id)
  const latestMessage = chat?.latestMessage
  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     if (selectedChat?._id === chat?._id) handleAccessChat(chat)
  //   })
  // }, [dispatch])

  return (
    <MenuItem key={chat?._id} onClick={() => handleAccessChat(chat)} selected={selectedChat?._id === chat._id}>
      <StyledAvatar user={otherUser} chat={chat} />
      <FlexColumn ml={2}>
        <Typography fontWeight='bold'>{chat.chatName ? chat.chatName : otherUser?.fullname}</Typography>
        <Typography
          variant='caption'
          fontWeight={
            latestMessage && isMe(latestMessage.sender._id, currentUser._id)
              ? ''
              : !latestMessage?.readBy.includes(currentUser._id) && latestMessage
              ? 'bold'
              : ''
          }>
          {latestMessage
            ? latestMessage.sender._id === currentUser._id
              ? `Bạn: ${latestMessage.content}`
              : latestMessage.content
            : 'Chưa có tin nhắn'}
        </Typography>
      </FlexColumn>
    </MenuItem>
  )
}

export default memo(ConversationCard)
