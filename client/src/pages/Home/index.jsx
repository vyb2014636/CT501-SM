import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useMediaQuery } from '@mui/material'
import LeftSide from '@/components/Side/LeftSide'
import ListFollowers from '@/components/Common/List/ListFollowers'
import ListContacts from '@/components/Common/List/ListContacts'
import RightSide from '@/components/Side/RightSide'

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
