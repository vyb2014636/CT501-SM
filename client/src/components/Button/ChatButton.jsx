import React from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import IconButton from '@mui/material/IconButton'

const ChatButton = () => {
  return (
    <IconButton>
      <ChatBubbleOutlineOutlinedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}

export default ChatButton
