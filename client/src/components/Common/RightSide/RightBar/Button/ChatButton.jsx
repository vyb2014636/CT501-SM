import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import { Tooltip } from '@mui/material'

const ChatButton = () => {
  const navigate = useNavigate()
  return (
    <Tooltip title='Chat'>
      <IconButton onClick={() => navigate('/chat')}>
        <ChatOutlinedIcon color='primary' fontSize='medium' />
      </IconButton>
    </Tooltip>
  )
}

export default ChatButton
