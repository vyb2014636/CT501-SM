import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, sendNewMessage } from '@/features/chat/chatThunk'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'

const ChatBox = ({ chat }) => {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.auth.user)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    dispatch(fetchMessages(chat._id))
  }, [dispatch, chat])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      dispatch(sendNewMessage({ chatID: chat._id, content: newMessage }))
      setNewMessage('')
    }
  }

  if (loading) return <Typography>Loading</Typography>

  const otherUser = chat.users.find((user) => user._id.toString() !== currentUser._id.toString())
  return (
    <Box
      sx={{
        flex: 3,
        borderRadius: 4,
        height: 1,
        py: 2,
        backgroundColor: 'background.paper'
      }}
      flex={1}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <Box display='flex' alignItems='center' mb={2} px={4}>
        <Avatar src={otherUser.avatar} />
        <Typography variant='h6' ml={2}>
          {otherUser.fullname}
        </Typography>
      </Box>

      <FlexColumn
        flex={1}
        sx={{
          px: 2,
          overflowY: 'auto',
          ...scrollbarStyleMui
        }}>
        {!loading && messages.length === 0 ? (
          <Typography>Không có tin nhắn nào giữa 2 người</Typography>
        ) : (
          messages?.map((message, index) => (
            <Box key={index} display='flex' justifyContent={message.sender._id === currentUser._id ? 'flex-end' : 'flex-start'}>
              <Box
                sx={{
                  bgcolor: message.sender._id === currentUser._id ? '#42a5f5' : 'background.message',
                  color: message.sender._id === currentUser._id ? 'white' : 'text.message',
                  p: 3,
                  m: 1,
                  borderRadius: '12px',
                  maxWidth: '60%'
                }}>
                <Typography>{message.content}</Typography>
                <Typography variant='caption' display='block' textAlign='right'>
                  {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: vi })}
                </Typography>
              </Box>
            </Box>
          ))
        )}
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
