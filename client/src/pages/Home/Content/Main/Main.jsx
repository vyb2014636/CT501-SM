import React from 'react'
import Box from '@mui/material/Box'
import ListPosts from './ListPosts/ListPosts'
import PostShare from './PostShare/PostShare'

const Main = () => {
  return (
    <Box my={2}>
      <PostShare />
      <ListPosts />
    </Box>
  )
}

export default Main
