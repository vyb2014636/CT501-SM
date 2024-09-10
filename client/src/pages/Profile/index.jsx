import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { listPostUserAPI } from '@/apis/post/postsAPI'
import LeftSide from '@/components/Side/LeftSide/LeftSide'
import RightSide from '@/components/Side/RightSide/RightSide'
import ListPosts from '@/components/List/ListPosts/ListPosts'
import { useMediaQuery } from '@mui/material'
import CardProfile from '../../components/Card/CardProfile/CardProfile'

const Profile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  const { user } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState([])

  const fetchUserListPost = async () => {
    const response = await listPostUserAPI()
    if (response) setPosts(response.post)
  }
  useEffect(() => {
    fetchUserListPost()
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
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
          <CardProfile user={user} />
          <ListPosts posts={posts} />
        </Box>
        <RightSide />
      </Box>
    </Container>
  )
}

export default Profile
