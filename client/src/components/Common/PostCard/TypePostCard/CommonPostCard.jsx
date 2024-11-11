import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import HeaderPostCard from '../HeaderPostCard/HeaderPostCard'
import ContentPostCard from '../ContentPostCard/ContentPostCard'
import InteractPostCard from '../InteractPostCard/InteractPostCard'
import MediaPostCard from '../MediaPostCard/MediaPostCard'
const CommonPostCard = ({ noMedia, post, isLiked, handleClickLike }) => {
  return (
    <Card sx={styleCardGeneral}>
      <HeaderPostCard userPost={post.byPost} post={post} visibleMenu />
      <ContentPostCard describe={post?.describe} />
      {!noMedia && MediaPostCard(post)}
      <CardContent>
        <Typography variant='body2'>
          {post.likes?.length} người thích, {post.comments.length} Bình luận
        </Typography>
      </CardContent>
      <Divider />
      {post.status === 'normal' && (
        <InteractPostCard isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} post={post} />
      )}
    </Card>
  )
}

export default CommonPostCard
