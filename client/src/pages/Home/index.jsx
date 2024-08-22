import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import LeftSide from '@/pages/Home/LeftSide/LeftSide'
import RightSide from '@/pages/Home/RightSide/RightSide'
import { useMediaQuery } from '@mui/material'

const Home = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar-thumb': { bgcolor: 'background.paper' },
            '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
            '&::-webkit-scrollbar': { width: 5 }
          }}>
          <Outlet />
        </Box>
        <RightSide />
      </Box>
    </Container>
  )
}

export default Home
