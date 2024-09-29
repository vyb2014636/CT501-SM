import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'
import LeftSide from '@/components/Layout/LeftSide/LeftSide'
import RightSide from '@/components/Layout/RightSide/RightSide'
import ContactList from '@/components/Common/List/ContactList'
import SuggestionList from '@/components/Common/List/SuggestionList'

const Home = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide>
          <SuggestionList />
        </LeftSide>
        <Outlet />
        <RightSide>
          <ContactList />
        </RightSide>
      </Box>
    </Container>
  )
}

export default Home
