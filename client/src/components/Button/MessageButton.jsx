import React from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import IconButton from '@mui/material/IconButton'

const MessageButton = () => {
  return (
    <IconButton>
      <ChatBubbleOutlineOutlinedIcon color='primary' />
    </IconButton>
  )
}

export default MessageButton
