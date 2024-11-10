import React, { memo, useMemo, useCallback } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { accessChat } from '@/features/chat/chatThunk'
import { useDispatch } from 'react-redux'
import StyledAvatar from '@/components/Common/AvatarStatus/StyledAvatar'
import { isMe } from '@/utils/helpers'

const ConversationCard = ({ chat, selectedChat, currentUser }) => {
  const dispatch = useDispatch()

  // Sử dụng useCallback để tránh việc tạo lại hàm handleAccessChat mỗi lần render
  const handleAccessChat = useCallback(() => {
    dispatch(accessChat({ chatID: chat._id }))
  }, [chat._id, dispatch])

  const otherUser = useMemo(() => chat.users.find((user) => user._id !== currentUser._id), [chat.users, currentUser._id])
  const latestMessage = useMemo(() => chat?.latestMessage)

  const isMessageUnread = useMemo(() => {
    return latestMessage && !latestMessage.readBy.includes(currentUser._id) && !isMe(latestMessage.sender._id, currentUser._id)
  }, [latestMessage, currentUser])

  const messageContent = useMemo(() => {
    if (!latestMessage) return 'Chưa có tin nhắn'
    return latestMessage.sender._id === currentUser._id
      ? `Bạn: ${latestMessage.content}`
      : chat.isGroupChat
      ? `${latestMessage.sender.fullname}: ${latestMessage.content}`
      : latestMessage.content
  }, [latestMessage, currentUser, chat.isGroupChat])

  return (
    <MenuItem key={chat?._id} onClick={handleAccessChat} selected={selectedChat?._id === chat._id}>
      <StyledAvatar user={otherUser} chat={chat} />
      <FlexColumn ml={2}>
        <Typography fontWeight='bold'>{chat.chatName ? chat.chatName : otherUser?.fullname}</Typography>
        <Typography variant='caption' fontWeight={isMessageUnread ? 'bold' : 'normal'}>
          {messageContent}
        </Typography>
      </FlexColumn>
    </MenuItem>
  )
}

export default memo(ConversationCard)
