import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import LeftSide from '@/components/LeftSide/LeftSide'
import RightSide from '@/components/RightSide/RightSide'
import Posts from '@/pages/HomePage/Posts/Posts'
import ProfileCard from './Profile/ProfileCard'

const ProfilePage = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
          <ProfileCard />
          <Posts />
        </Box>
        <RightSide />
      </Box>
    </Container>
  )
}

export default ProfilePage
