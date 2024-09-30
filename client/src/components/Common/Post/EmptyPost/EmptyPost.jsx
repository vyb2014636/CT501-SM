import { Typography } from '@mui/material'
import React, { memo } from 'react'

const EmptyPost = ({ totalPosts }) => {
  return (
    totalPosts === 0 && (
      <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
        Không có bài viết nào được đăng
      </Typography>
    )
  )
}

export default memo(EmptyPost)
