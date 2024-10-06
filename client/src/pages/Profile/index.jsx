import React from 'react'
import { useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import RightSide from '@/components/Common/RightSide/RightSide'

const Profile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Outlet />
        <RightSide />
      </Box>
    </Container>
  )
}

export default Profile
