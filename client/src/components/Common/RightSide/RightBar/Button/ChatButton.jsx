import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import { Badge, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelect } from '@/features/chat/chatSlice'

const ChatButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { chats, selectedChat, loading } = useSelector((state) => state.chat)
  const currentUser = useSelector((state) => state.auth.user)

  const handleClick = async () => {
    try {
      dispatch(resetSelect())
      navigate('/chat')
    } catch (error) {
      console.log(error)
    }
  }
  const hasUnreadMessages = chats.some((chat) => {
    const latestMessage = chat.latestMessage
    return (
      latestMessage &&
      !latestMessage.readBy.includes(currentUser._id.toString()) &&
      latestMessage.sender._id.toString() !== currentUser._id.toString()
    )
  })
  return (
    <Tooltip title='Chat'>
      <IconButton onClick={handleClick}>
        <Badge
          color='primary'
          variant='dot'
          invisible={!hasUnreadMessages} // Hiển thị badge khi có tin nhắn chưa đọc
        >
          <ChatOutlinedIcon color='primary' fontSize='medium' />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default ChatButton
