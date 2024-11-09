import React, { memo, useState } from 'react'

import Typography from '@mui/material/Typography'

import { useSelector } from 'react-redux'
import FlexColumn from '../Common/Flex/FlexColumn'
import FlexBetween from '../Common/Flex/FlexBetween'
import AddGroupButton from './Button/AddGroupButton'
import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ConversationCard from './Card/ConversationCard'
import FlexCenter from '../Common/Flex/FlexCenter'

const Conversation = ({ loadingChats, chats, selectedChat }) => {
  const currentUser = useSelector((state) => state.auth.user)

  const [search, setSearch] = useState('')

  const filteredChats = chats.filter((chat) => {
    let otherUser = null
    if (chat.users.length === 2) otherUser = chat.users.find((user) => user._id !== currentUser._id)
    const groupName = chat.chatName || ''
    return otherUser?.fullname?.toLowerCase().includes(search.toLowerCase()) || groupName.toLowerCase().includes(search.toLowerCase())
  })

  if (loadingChats) return <Typography>...loading</Typography>

  return (
    <FlexColumn height={1}>
      <FlexBetween p={3}>
        <Typography variant='h5' color='primary' fontWeight='bold'>
          Đoạn chat
        </Typography>
        <AddGroupButton currentUser={currentUser} chats={chats} />
      </FlexBetween>

      <FlexCenter sx={{ backgroundColor: 'background.default', borderRadius: '20px', padding: '5px 10px', width: 1 }}>
        <SearchIcon />
        <InputBase placeholder='Tìm kiếm trên Messenger' sx={{ marginLeft: 1, flex: 1 }} value={search} onChange={(e) => setSearch(e.target.value)} />
      </FlexCenter>

      <FlexColumn gap={2} py={2} sx={{ overflowY: 'auto', height: 1 }}>
        {search.trim() === '' ? (
          chats.map((chat) => {
            return <ConversationCard chat={chat} selectedChat={selectedChat} currentUser={currentUser} />
          })
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            return <ConversationCard chat={chat} selectedChat={selectedChat} currentUser={currentUser} />
          })
        ) : (
          <Typography>Không có kết quả tìm kiếm phù hợp</Typography>
        )}
      </FlexColumn>
    </FlexColumn>
  )
}

export default memo(Conversation)
