import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListPosts from './ListPosts/ListPosts'
import PostShare from './PostShare/PostShare'
import { listPostsAPI } from '@/apis/postsAPI'

const Main = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    listPostsAPI()
      .then((response) => {
        setPosts(response.post)
        console.log(response.post)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <Box my={2}>
      <PostShare />
      <ListPosts posts={posts} />
    </Box>
  )
}

export default Main
