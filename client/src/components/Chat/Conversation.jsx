import { Box, Typography } from '@mui/material'
import React from 'react'

const Conversation = ({ loadingChats, chats }) => {
  if (loadingChats) return <Typography>...loading</Typography>
  if (!loadingChats && chats.length === 0) return <Typography>Không có tin nhắn nào gần đây đã nhắn</Typography>

  return chats.map((chat) => <Typography>c{chat.chatName}</Typography>)
}

export default Conversation
