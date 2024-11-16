import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import RightSide from '@/components/Common/RightSide/RightSide'
import ListContact from '@/components/Contact/ListContact'
import Suggestion from '@/components/Suggestion/Suggestion'

const Home = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh', p: !isNonScreenMobile && 3 }}>
        <LeftSide>
          <Suggestion />
        </LeftSide>
        <Outlet />
        <RightSide>
          <ListContact />
        </RightSide>
      </Box>
    </Container>
  )
}

export default Home
