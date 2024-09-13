import React, { memo } from 'react'
import Box from '@mui/material/Box'
import Post from '../Post/Post'

const ListPosts = ({ posts }) => {
  console.log(posts)
  return (
    <Box my={2}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  )
}

export default memo(ListPosts)
