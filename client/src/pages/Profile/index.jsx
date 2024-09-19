import React from 'react'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LeftSide from '@/components/Side/LeftSide'
import RightSide from '@/components/Side/RightSide'
import ListPosts from '@/components/Common/List/ListPosts'
import CardProfile from '@/components/Card/CardProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')
  const { userId } = useParams()

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <ListPosts userId={userId} />
        <RightSide />
      </Box>
    </Container>
  )
}

export default Profile
