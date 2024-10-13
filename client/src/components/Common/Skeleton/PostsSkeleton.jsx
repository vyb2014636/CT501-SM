import * as React from 'react'

import Box from '@mui/material/Box'
import PostCreationSkeleton from './PostCreationSkeleton'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import PostSkeleton from './Children/PostSkeleton'
const PostsSkeleton = () => {
  return (
    <Box sx={{ ...styleMain, ...scrollbarStyleMui }}>
      <PostCreationSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </Box>
  )
}

export default PostsSkeleton
