import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfileBar from './ProfileBar/ProfileBar'
import ListPosts from '@pages/Home/Content/Main/ListPosts/ListPosts'
import { useSelector } from 'react-redux'
import { listPostUserAPI } from '@/apis/postsAPI'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    listPostUserAPI()
      .then((response) => {
        setPosts(response.post)
        console.log(response.post)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
        <ProfileBar />
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', width: '720px', mx: 'auto' }}>
          <ProfileCard user={user} />
          <ListPosts posts={posts} />
        </Box>
      </Box>
    </Container>
  )
}

export default Profile
