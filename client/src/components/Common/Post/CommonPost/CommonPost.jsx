import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import renderMedia from '@/components/Common/Post/MediaPost/MediaPost'
import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import PostContent from '../ContentPost/ContentPost'
import PostInteract from '../InteractPost/InteractPost'
import PostHeader from '../HeaderPost/HeaderPost'

const CommonPost = ({ noMedia, post, isLiked, handleClickLike }) => {
  return (
    <Card sx={styleCardGeneral}>
      <PostHeader userPost={post.byPost} post={post} visibleMenu />
      <PostContent describe={post?.describe || 'Lỗi hiển thị nội dung'} />
      {!noMedia && renderMedia(post)}
      <CardContent>
        <Typography variant='body2'>{post.likes?.length} người thích</Typography>
      </CardContent>
      <Divider />
      <PostInteract isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} post={post} />
    </Card>
  )
}

export default CommonPost
