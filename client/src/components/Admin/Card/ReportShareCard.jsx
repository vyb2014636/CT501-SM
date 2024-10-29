import ContentPostCard from '@/components/Common/PostCard/ContentPostCard/ContentPostCard'
import HeaderPostCard from '@/components/Common/PostCard/HeaderPostCard/HeaderPostCard'
import MediaPostCard from '@/components/Common/PostCard/MediaPostCard/MediaPostCard'
import { styleCardGeneral } from '@/styles/stylePost/style'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

const ReportShareCard = ({ post }) => {
  return (
    <Card sx={styleCardGeneral}>
      <HeaderPostCard userPost={post.byPost} post={post} visibleMenu admin />
      <ContentPostCard describe={post.describe} />

      <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
        <HeaderPostCard userPost={post.sharedPost.byPost} post={post?.sharedPost} />
        <ContentPostCard describe={post.sharedPost.describe} />
        {MediaPostCard(post?.sharedPost)}
      </Card>

      <CardContent>
        <Typography variant='body2'>
          {post.likes?.length} người thích, {post.comments.length} Bình luận
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  )
}

export default ReportShareCard
