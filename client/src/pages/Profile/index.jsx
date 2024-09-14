import React, { memo, useEffect, useState } from 'react'
import { listUserPostAPI } from '@/apis/post/postsAPI'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CardProfile from '@/components/Card/CardProfile'
import ListPosts from '@/components/Common/List/ListPosts'
import LeftSide from '@/components/Side/LeftSide'
import RightSide from '@/components/Side/RightSide'

const Profile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')
  const { userId } = useParams()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUserListPost = async (userId) => {
    const response = await listUserPostAPI(userId)
    if (response) {
      setPosts(response.posts)
      setUser(response.user)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchUserListPost(userId)
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <CardProfile user={user} />
              <ListPosts posts={posts} />
            </>
          )}
        </Box>
        <RightSide />
      </Box>
    </Container>
  )
}

export default memo(Profile)
