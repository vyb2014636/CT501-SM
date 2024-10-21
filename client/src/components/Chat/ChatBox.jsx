import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { scrollbarStyleMui } from '@/styles/styles'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, sendNewMessage } from '@/features/chat/chatThunk'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'
import FlexBetween from '../Common/Flex/FlexBetween'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Skeleton, Tooltip } from '@mui/material'
import ChatInfoEdit from './ChatInfoEdit' // Import component mới tạo
import FlexArrow from '../Common/Flex/FlexArround'
import FlexRow from '../Common/Flex/FlexRow'
import { isMe } from '@/utils/helpers'

const ChatBox = ({ chat }) => {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.auth.user)
  const [newMessage, setNewMessage] = useState('')
  const [editingInfo, setEditingInfo] = useState(false) // State để xác định có đang chỉnh sửa thông tin không

  const messagesEndRef = useRef(null)

  useEffect(() => {
    dispatch(fetchMessages(chat._id))
  }, [dispatch, chat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      dispatch(sendNewMessage({ chatID: chat._id, content: newMessage }))
      setNewMessage('')
    }
  }

  const handleSaveChatInfo = (chatId, updatedInfo) => {
    console.log('Lưu thông tin chat:', chatId, updatedInfo)
    setEditingInfo(false) // Đóng form chỉnh sửa thông tin
  }

  if (loading) return <Skeleton sx={{ flex: 3 }} height={1} width={1} />

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
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      {editingInfo ? (
        <ChatInfoEdit chat={chat} onSave={handleSaveChatInfo} onCancel={() => setEditingInfo(false)} />
      ) : (
        <>
          <FlexBetween p={3}>
            <Box display='flex' alignItems='center'>
              <Avatar src={chat.isGroupChat ? chat?.avatar : otherUser?.avatar} />
              <Typography variant='h6' ml={2}>
                {chat.chatName ? chat.chatName : otherUser.fullname}
              </Typography>
            </Box>
            {chat.isGroupChat && (
              <Tooltip title='Thông tin'>
                <IconButton onClick={() => setEditingInfo(true)}>
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </FlexBetween>

          <FlexColumn
            flex={1}
            sx={{
              px: 2,
              overflowY: 'auto',
              ...scrollbarStyleMui
            }}>
            {!loading && messages.length === 0 ? (
              <Typography>Không có tin nhắn nào</Typography>
            ) : (
              messages?.map((message, index) => (
                <Box key={index} display='flex' justifyContent={message.sender._id === currentUser._id ? 'flex-end' : 'flex-start'}>
                  <FlexRow
                    sx={{
                      maxWidth: '60%',
                      alignItems: 'end',
                      m: 1,
                      gap: 1
                    }}>
                    {!isMe(message.sender._id, currentUser._id) && <Avatar src={message.sender.avatar} />}
                    <Box
                      sx={{
                        bgcolor: message.sender._id === currentUser._id ? '#42a5f5' : 'background.message',
                        color: message.sender._id === currentUser._id ? 'white' : 'text.message',
                        p: 3,
                        borderRadius: '12px'
                      }}>
                      <Typography>{message.content}</Typography>
                      <Typography variant='caption' display='block' textAlign='right'>
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: vi })}
                      </Typography>
                    </Box>
                  </FlexRow>
                </Box>
              ))
            )}
            <div ref={messagesEndRef} />
          </FlexColumn>

          <Box display='flex' mt={2} px={4}>
            <TextField
              className='inputChat'
              variant='outlined'
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Nhập tin nhắn của bạn'
            />
            <IconButton color='primary' onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ChatBox
