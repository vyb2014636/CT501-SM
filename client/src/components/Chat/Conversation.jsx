import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { accessChat } from '@/features/chat/chatThunk'
import FlexColumn from '../Common/Flex/FlexColumn'
import { isMe } from '@/utils/helpers'
import FlexBetween from '../Common/Flex/FlexBetween'
import AddGroupButton from './Button/AddGroupButton'
import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Conversation = ({ loadingChats, chats, selectedChat }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const onlineUsers = useSelector((state) => state.online.onlineUsers) // Lấy danh sách người dùng online

  const [search, setSearch] = useState('')
  console.log(onlineUsers)
  if (loadingChats) return <Typography>...loading</Typography>

  if (!loadingChats && chats.length === 0) return <Typography>Không có tin nhắn nào gần đây đã nhắn</Typography>

  const handleAccessChat = async (chat) => {
    dispatch(accessChat({ chatID: chat._id }))
  }

  // Lọc danh sách chat dựa trên giá trị tìm kiếm
  const listChat = chats.filter((chat) => {
    const otherUser = chat.users.find((user) => user._id !== currentUser._id)
    return otherUser?.fullname.toLowerCase().includes(search.toLowerCase())
  })

  const filteredChats = chats.filter((chat) => {
    const otherUser = chat.users.find((user) => user._id !== currentUser._id)
    const groupName = chat.chatName || ''
    return otherUser?.fullname?.toLowerCase().includes(search.toLowerCase()) || groupName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <FlexColumn height={1}>
      <FlexBetween p={3}>
        <Typography variant='h5' color='primary' fontWeight='bold'>
          Đoạn chat
        </Typography>
        <AddGroupButton currentUser={currentUser} />
      </FlexBetween>

      <Box
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px',
          width: 1
        }}>
        <SearchIcon />
        <InputBase placeholder='Tìm kiếm trên Messenger' sx={{ marginLeft: 1, flex: 1 }} value={search} onChange={(e) => setSearch(e.target.value)} />
      </Box>

      <FlexColumn gap={2} py={2} sx={{ overflowY: 'auto', height: 1 }}>
        {search.trim() === '' ? (
          listChat.map((chat) => {
            const otherUser = chat.users.find((user) => user._id !== currentUser._id)
            const latestMessage = chat?.latestMessage
            return (
              <MenuItem key={chat?._id} onClick={() => handleAccessChat(chat)} selected={selectedChat?._id === chat._id}>
                <Avatar src={chat.isGroupChat ? chat?.avatar : otherUser?.avatar} />
                <FlexColumn ml={2}>
                  <Typography fontWeight='bold'>{chat.chatName ? chat.chatName : otherUser?.fullname}</Typography>
                  <Typography
                    variant='caption'
                    fontWeight={
                      latestMessage && isMe(latestMessage.sender._id, currentUser._id)
                        ? 'normal'
                        : !latestMessage?.readBy.includes(currentUser._id)
                        ? 'bold'
                        : 'normal'
                    }>
                    {latestMessage
                      ? latestMessage.sender._id === currentUser._id
                        ? `Bạn: ${latestMessage.content}`
                        : latestMessage.content
                      : 'Chưa có tin nhắn nào'}
                  </Typography>
                </FlexColumn>
              </MenuItem>
            )
          })
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const otherUser = chat.users.find((user) => user._id !== currentUser._id)
            const latestMessage = chat?.latestMessage
            return (
              <MenuItem key={chat?._id} onClick={() => handleAccessChat(chat)} selected={selectedChat?._id === chat._id}>
                <Avatar src={otherUser?.avatar} />
                <FlexColumn ml={2}>
                  <Typography fontWeight='bold'>{chat.chatName ? chat.chatName : otherUser?.fullname}</Typography>
                  <Typography
                    variant='caption'
                    fontWeight={
                      latestMessage && isMe(latestMessage.sender._id, currentUser._id) ? '' : latestMessage?.readBy?.length === 0 ? 'bold' : ''
                    }>
                    {latestMessage
                      ? latestMessage.sender._id === currentUser._id
                        ? `Bạn: ${latestMessage.content}`
                        : latestMessage.content
                      : 'Không hoạt động'}
                  </Typography>
                </FlexColumn>
              </MenuItem>
            )
          })
        ) : (
          <Typography>Không có kết quả tìm kiếm phù hợp</Typography>
        )}
      </FlexColumn>
    </FlexColumn>
  )
}

export default Conversation
