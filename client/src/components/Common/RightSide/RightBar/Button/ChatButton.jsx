import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, IconButton, Tooltip } from '@mui/material'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import { resetSelect } from '@/features/chat/chatSlice'

const ChatButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { chats, loading } = useSelector((state) => state.chat)
  const currentUser = useSelector((state) => state.auth.user)

  const handleClick = () => {
    dispatch(resetSelect())
    navigate('/chat')
  }

  const hasUnreadMessages = chats.some(
    ({ latestMessage }) => latestMessage && !latestMessage.readBy.includes(currentUser._id) && latestMessage.sender._id !== currentUser._id
  )

  return (
    <Tooltip title='Chat'>
      <IconButton onClick={handleClick}>
        <Badge color='primary' variant='dot' invisible={!hasUnreadMessages}>
          <ChatOutlinedIcon color='primary' fontSize='medium' />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default ChatButton
