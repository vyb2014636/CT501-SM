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

const Chat = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh', px: !isNonScreenMobile && 32 }}>
        <LeftSide />

        <RightSide />
      </Box>
    </Container>
  )
}

export default Chat
