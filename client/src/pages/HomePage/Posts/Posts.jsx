import React from 'react'
import Box from '@mui/material/Box'
import Post from '@/components/Post/Post'
import PostShare from '@/components/PostShare/PostShare'

const Posts = () => {
  return (
    <Box my={2}>
      <PostShare />
      <Post />
    </Box>
  )
}

export default Posts
