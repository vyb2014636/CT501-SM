import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useMediaQuery } from '@mui/material'
import LeftSide from '@/components/Common/Side/LeftSide'
import ListFollowers from '@/components/Common/List/ListFollowers'
import ListContacts from '@/components/Common/List/ListContacts'
import RightSide from '@/components/Common/Side/RightSide'

const Home = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide>
          <ListFollowers />
        </LeftSide>
        <Outlet />
        <RightSide>
          <ListContacts />
        </RightSide>
      </Box>
    </Container>
  )
}

export default Home
