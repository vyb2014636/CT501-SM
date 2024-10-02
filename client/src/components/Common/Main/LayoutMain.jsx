import React from 'react'
import { Box, Typography } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import PostList from '@/components/Common/List/PostList'
import { scrollbarStyleMui } from '@/styles/styles'

const LayoutMain = ({ loading, posts, pageRef, children }) => {
  if (loading && posts.length === 0) {
    return (
      <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonPosts key={i} />
        ))}
      </Box>
    )
  } else return <PostList pageRef={pageRef}>{children}</PostList>
}

export default LayoutMain
