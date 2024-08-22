import React from 'react'
import Box from '@mui/material/Box'
import Post from '@/pages/Home/Content/Main/ListPosts/Post/Post'

const ListPosts = () => {
  return (
    <Box my={2}>
      <Post />
      <Post noMedia />
      <Post />
    </Box>
  )
}

export default ListPosts
