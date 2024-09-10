import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import LeftSide from '@/components/Side/LeftSide/LeftSide'
import RightSide from '@/components/Side/RightSide/RightSide'
import { useMediaQuery } from '@mui/material'
import ListFollowers from '@/components/List/ListFollowers/ListFollowers'
import ListContacts from '@/components/List/ListContacts/ListContacts'

const Home = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide>
          <ListFollowers />
        </LeftSide>
        <Box
          sx={{
            flex: 1,
            py: 2,
            px: 4,
            mx: 4,
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar-thumb': { bgcolor: 'background.paper' },
            '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
            '&::-webkit-scrollbar': { width: 5 }
          }}>
          <Outlet />
        </Box>
        <RightSide>
          <ListContacts />
        </RightSide>
      </Box>
    </Container>
  )
}

export default Home
