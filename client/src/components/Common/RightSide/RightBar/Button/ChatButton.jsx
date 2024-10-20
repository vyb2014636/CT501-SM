import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { resetSelect } from '@/features/chat/chatSlice'

const ChatButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = async () => {
    try {
      dispatch(resetSelect())
      navigate('/chat')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Tooltip title='Chat'>
      <IconButton onClick={handleClick}>
        <ChatOutlinedIcon color='primary' fontSize='medium' />
      </IconButton>
    </Tooltip>
  )
}

export default ChatButton
