import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import RightSide from '@/components/Common/RightSide/RightSide'
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import Conversation from '@/components/Chat/Conversation'
import { useDispatch, useSelector } from 'react-redux'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ChatBox from '@/components/Chat/ChatBox'
import { fetchChats } from '@/features/chat/chatThunk'
import { Typography } from '@mui/material'

const Chat = () => {
  const dispatch = useDispatch()
  const isNonScreenMobile = useMediaQuery('(min-width: 1050px)')
  const { chats, selectedChat, loading } = useSelector((state) => state.chat)
  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])
  console.log(chats)
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', px: !isNonScreenMobile && 32 }}>
        <FlexRow sx={{ height: (theme) => theme.myApp.heighHeader }}>
          <LeftSide />
          <Box sx={{ ...styleMain, ...scrollbarStyleMui }}></Box>
          <RightSide />
        </FlexRow>
        <FlexRow sx={{ height: (theme) => `calc(100vh - ${theme.myApp.heighHeader})`, p: 4, gap: 3 }}>
          <Box sx={{ flex: 2 }}>
            <Conversation loadingChats={loading} chats={chats} />
          </Box>
          {selectedChat ? <ChatBox chat={selectedChat} /> : <Typography>Vui lòng chọn cuộc hội thoại</Typography>}
          {/* <ChatBox /> */}
        </FlexRow>
      </Box>
    </Container>
  )
}

export default Chat
