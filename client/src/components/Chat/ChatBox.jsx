import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { scrollbarStyleMui } from '@/styles/styles'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { useDispatch, useSelector } from 'react-redux'
import { accessChat, fetchMessages, sendNewMessage } from '@/features/chat/chatThunk'
import FlexBetween from '../Common/Flex/FlexBetween'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { CircularProgress, Skeleton, Tooltip } from '@mui/material'
import ChatInfoEdit from './ChatInfoEdit'
import FlexCenter from '../Common/Flex/FlexCenter'
import MessageCard from './Card/MessageCard'
import StyledAvatar from '../Common/AvatarStatus/StyledAvatar'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { selectChat } from '@/features/chat/chatSlice'
import ChatBoxSkeleton from '../Common/Skeleton/ChatBoxSkeleton'

const ChatBox = ({ selectedChat }) => {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.auth.user)
  const [newMessage, setNewMessage] = useState('')
  const [imageFile, setImageFile] = useState(null) // Lưu ảnh được chọn
  const [imagePreview, setImagePreview] = useState(null) // Lưu ảnh xem trước
  const [editingInfo, setEditingInfo] = useState(false)
  const [loadingSend, setLoadingSend] = useState(false)

  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')

  const messagesEndRef = useRef(null)

  useEffect(() => {
    dispatch(fetchMessages(selectedChat._id))
    setEditingInfo(false)
  }, [dispatch, selectedChat._id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Đoạn này để gửi tin nhắn khi có nội dung và ảnh
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault()
      const formData = new FormData()

      if (imageFile) {
        formData.append('image', imageFile) // Đính kèm file ảnh
        setImageFile(null) // Reset sau khi gửi
        setImagePreview(null) // Reset ảnh xem trước
      }

      if (newMessage.trim()) {
        formData.append('content', newMessage) // Nội dung tin nhắn
      }

      formData.append('chatID', selectedChat._id)
      // dispatch(openBackdrop())
      setLoadingSend(true)
      try {
        await dispatch(sendNewMessage(formData)) // Gửi FormData tới backend
        setNewMessage('')
      } catch (error) {
        console.error('Gửi tin nhắn thất bại:', error.message)
      }
      // dispatch(closeBackdrop())
      setLoadingSend(false)
    },
    [dispatch, newMessage, imageFile, selectedChat._id]
  )

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) // Cập nhật ảnh xem trước
      }
      reader.readAsDataURL(file) // Đọc file ảnh
    }
  }

  // Hàm xóa ảnh đã chọn
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSaveChatInfo = useCallback(() => {
    setEditingInfo(false)
  }, [])

  const otherUser = useMemo(() => {
    return selectedChat.users.find((user) => user._id.toString() !== currentUser._id.toString())
  }, [selectedChat, currentUser._id])

  if (loading) return <ChatBoxSkeleton />

  return (
    <FlexColumn sx={{ flex: 3, borderRadius: 4, py: 2, backgroundColor: 'background.paper' }} height={1} justifyContent='space-between'>
      {editingInfo ? (
        <ChatInfoEdit chat={selectedChat} onSave={handleSaveChatInfo} onCancel={() => setEditingInfo(false)} />
      ) : (
        <>
          <FlexBetween p={3}>
            <FlexCenter display='flex' alignItems='center'>
              {!isNonScreenMobile && (
                <IconButton onClick={() => dispatch(selectChat(null))} sx={{ alignSelf: 'flex-start' }}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <StyledAvatar user={otherUser} chat={selectedChat} />
              <Typography variant='h6' ml={2}>
                {selectedChat.chatName ? selectedChat.chatName : otherUser.fullname}
              </Typography>
            </FlexCenter>
            {selectedChat.isGroupChat && (
              <Tooltip title='Thông tin'>
                <IconButton onClick={() => setEditingInfo(true)}>
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </FlexBetween>

          <FlexColumn flex={1} sx={{ px: 2, ...scrollbarStyleMui }}>
            {!loading && messages.length === 0 ? (
              <Typography>Không có tin nhắn nào</Typography>
            ) : (
              messages?.map((message) => <MessageCard key={message._id} message={message} currentUser={currentUser} />)
            )}
            <div ref={messagesEndRef} />
          </FlexColumn>

          <Box display='flex' mt={2} px={4} component='form' onSubmit={handleSendMessage}>
            <IconButton color='primary' component='label'>
              <AttachFileIcon />
              <input type='file' hidden onChange={handleImageChange} />
            </IconButton>
            <TextField
              className='inputChat'
              variant='outlined'
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Nhập tin nhắn của bạn'
            />
            <IconButton color='primary' type='submit' disabled={loadingSend}>
              {loadingSend ? <CircularProgress /> : <SendIcon />}
            </IconButton>
          </Box>

          {/* Hiển thị ảnh xem trước nếu có */}
          {imagePreview && (
            <Box mt={2} display='flex' justifyContent='center' alignItems='center' position='relative'>
              <img src={imagePreview} alt='Preview' style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
              <IconButton color='primary' onClick={handleRemoveImage} sx={{ position: 'absolute', top: '20px', right: '20px' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </>
      )}
    </FlexColumn>
  )
}

export default memo(ChatBox)
