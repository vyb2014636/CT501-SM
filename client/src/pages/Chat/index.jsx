import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import RightSide from '@/components/Common/RightSide/RightSide'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import Conversation from '@/components/Chat/Conversation'
import { useDispatch, useSelector } from 'react-redux'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ChatBox from '@/components/Chat/ChatBox'
import { accessChat, fetchChats } from '@/features/chat/chatThunk'
import { Typography } from '@mui/material'
import socket from '@/services/socket'
import MenuMobile from '@/components/Mobile/MenuMobile'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
const Chat = () => {
  const dispatch = useDispatch()
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')
  const { chats, selectedChat, loading } = useSelector((state) => state.chat)

  useEffect(() => {
    const handleMessageReceived = (data) => {
      if (selectedChat && selectedChat._id && data.chatID === selectedChat._id) {
        dispatch(accessChat({ chatID: selectedChat._id }))
      }
    }

    socket.on('receive_message', handleMessageReceived)

    return () => {
      socket.off('receive_message', handleMessageReceived)
    }
  }, [dispatch, selectedChat])

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: !isNonScreenMobile && 3 }}>
        {isNonScreenMobile ? (
          <FlexRow sx={{ height: (theme) => theme.myApp.heighHeader }}>
            <LeftSide />
            <Box sx={{ ...styleMain, ...scrollbarStyleMui }}></Box>
            <RightSide />
          </FlexRow>
        ) : (
          <MenuMobile />
        )}
        <Box
          sx={{
            height: (theme) => `calc(100vh - ${theme.myApp.heighHeader})`,
            p: 4,
            gap: 3,
            display: 'flex',
            flexDirection: !isNonScreenMobile && 'column'
          }}>
          {isNonScreenMobile ? (
            <>
              <Box
                sx={{
                  flex: 1,
                  mb: 'auto',
                  borderRadius: 4,
                  height: 1,
                  p: 2,
                  backgroundColor: 'background.paper'
                }}>
                <Conversation loadingChats={loading} chats={chats} selectedChat={selectedChat} />
              </Box>
              {selectedChat ? (
                <ChatBox selectedChat={selectedChat} />
              ) : (
                <FlexColumn
                  sx={{
                    display: 'flex',
                    flex: 3,
                    backgroundColor: 'background.paper',
                    height: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4
                  }}>
                  <StickyNote2OutlinedIcon sx={{ fontSize: 100, color: 'primary', mb: 1 }} />
                  <Typography variant='h5' fontWeight='bold'>
                    Vui lòng chọn đoạn chat
                  </Typography>
                </FlexColumn>
              )}
            </>
          ) : (
            <>
              {!selectedChat ? (
                <Box
                  sx={{
                    flex: 1,
                    mb: 'auto',
                    borderRadius: 4,
                    height: 1,
                    p: 2,
                    backgroundColor: 'background.paper'
                  }}>
                  <Conversation loadingChats={loading} chats={chats} selectedChat={selectedChat} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
                  <ChatBox selectedChat={selectedChat} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default Chat
