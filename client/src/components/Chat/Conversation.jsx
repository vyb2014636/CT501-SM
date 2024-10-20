import React from 'react'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { accessChat } from '@/features/chat/chatThunk'
import { sortChatsByLatestMessage } from '@/services/sort'
import FlexColumn from '../Common/Flex/FlexColumn'
import { isMe } from '@/utils/helpers'

const Conversation = ({ loadingChats, chats, selectedChat }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)

  if (loadingChats) return <Typography>...loading</Typography>

  if (!loadingChats && chats.length === 0) return <Typography>Không có tin nhắn nào gần đây đã nhắn</Typography>

  const handleAccessChat = async (chat) => {
    dispatch(accessChat({ chatID: chat._id }))
  }
  return (
    <>
      <Box>
        <Typography variant='h6' color='primary'>
          Các tin nhắn
        </Typography>
      </Box>
      {chats.map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== currentUser._id)
        const latestMessage = chat?.latestMessage
        return (
          <MenuItem key={chat?._id} onClick={() => handleAccessChat(chat)} selected={selectedChat?._id === chat._id}>
            {/* Hiển thị avatar và tên của người không phải bạn */}
            <Avatar src={otherUser?.avatar} />
            <FlexColumn ml={2}>
              <Typography fontWeight='bold'>{otherUser?.fullname}</Typography>
              <Typography
                variant='caption'
                fontWeight={latestMessage && isMe(latestMessage.sender._id, currentUser._id) ? '' : latestMessage.readBy?.length === 0 ? 'bold' : ''}>
                {latestMessage
                  ? latestMessage.sender._id === currentUser._id
                    ? `Bạn: ${latestMessage.content}`
                    : latestMessage.content
                  : 'Không hoạt động'}
              </Typography>
            </FlexColumn>
          </MenuItem>
        )
      })}
    </>
  )
}

export default Conversation
