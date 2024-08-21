import React from 'react'
import Box from '@mui/material/Box'
import Posts from './Posts/Posts'
import PostShare from './PostShare/PostShare'

const Main = () => {
  return (
    <Box my={2}>
      <PostShare />
      <Posts />
    </Box>
  )
}

export default Main
