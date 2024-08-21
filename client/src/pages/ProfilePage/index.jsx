import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Posts from '@/pages/HomePage/Content/Main/Posts/Posts'
import ProfileCard from './ProfileCard/ProfileCard'
import { useMediaQuery } from '@mui/material'
import ProfileBar from './ProfileBar/ProfileBar'

const ProfilePage = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
        <ProfileBar />
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', width: '720px', mx: 'auto' }}>
          <ProfileCard />
          <Posts />
        </Box>
      </Box>
    </Container>
  )
}

export default ProfilePage
