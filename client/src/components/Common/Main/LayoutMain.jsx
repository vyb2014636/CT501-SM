import React from 'react'
import { Box, Typography } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import PostList from '@/components/Common/Main/PersonalFeed'
import { scrollbarStyleMui } from '@/styles/styles'
import { useSelector } from 'react-redux'

const LayoutMain = ({ loading, posts, pageRef, children, loadingFriendship }) => {
  if (loading && posts.length === 0 && loadingFriendship) {
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
