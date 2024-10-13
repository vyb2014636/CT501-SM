import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import RightSide from '@/components/Common/RightSide/RightSide'
import Container from '@mui/material/Container'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: 'We will have a lot of fun soon 😄', time: '16 hours ago', sender: 'John Doe', type: 'sent' },
    { text: "Hey Elon let's go for party tonight again 😜🥳", time: '27 minutes ago', sender: 'John Doe', type: 'sent' },
    { text: 'Yeah', time: '4 minutes ago', sender: 'Elon', type: 'received' },
    { text: 'Hey Elon How Tesla going? 😉', time: '2 minutes ago', sender: 'John Doe', type: 'sent' },
    { text: 'Pack up your buckets', time: '4 minutes ago', sender: 'Elon', type: 'received' }
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, time: 'Just now', sender: 'John Doe', type: 'sent' }])
      setNewMessage('')
    }
  }
  return (
    <Box
      sx={{
        m: 'auto',
        borderRadius: 4,
        height: 0.95,
        backgroundColor: 'background.paper',
        ...styleMain
      }}
      flex={1}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <Box display='flex' alignItems='center' mb={2} px={4}>
        <Avatar src='https://i.pravatar.cc/150?img=1' />
        <Typography variant='h6' ml={2}>
          John Doe
        </Typography>
      </Box>

      <FlexColumn
        flex={1}
        sx={{
          px: 2,
          overflowY: 'auto',
          ...scrollbarStyleMui
        }}>
        {messages.map((message, index) => (
          <Box key={index} display='flex' justifyContent={message.type === 'sent' ? 'flex-end' : 'flex-start'}>
            <Box
              sx={{
                bgcolor: message.type === 'sent' ? '#42a5f5' : 'background.message',
                color: message.type === 'sent' ? 'white' : 'text.message',
                p: 3,
                m: 1,
                borderRadius: '12px',
                maxWidth: '60%'
              }}>
              <Typography>{message.text}</Typography>
              <Typography variant='caption' display='block' textAlign='right'>
                {message.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </FlexColumn>

      <Box display='flex' mt={2} px={4}>
        <TextField
          className='inputChat'
          variant='outlined'
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message...'
        />
        <IconButton color='primary' onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatBox
