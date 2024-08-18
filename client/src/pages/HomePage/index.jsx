import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import { useMediaQuery } from '@mui/material'
import PostShare from '@/components/Posts/PostShare/PostShare'

const HomePage = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          <PostShare />
          <Outlet />
        </Box>
        <RightSide />
      </Box>
    </Container>
  )
}

export default HomePage
