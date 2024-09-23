import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import renderMedia from '@/components/Common/Mansory/MansoryMedia'
import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import PostContent from '../PostContent/PostContent'
import PostInteract from '../PostInteract/PostInteract'
import PostHeader from '../PostHeader/PostHeader'

const PostCommon = ({ noMedia, post, isLiked, handleClickLike }) => {
  return (
    <Card sx={styleCardGeneral}>
      <PostHeader userPost={post.byPost} post={post} visibleMenu />
      <PostContent describe={post?.describe || 'Lỗi hiển thị nội dung'} />
      {!noMedia && renderMedia(post)}
      <CardContent>
        <Typography variant='body2'>{post.likes?.length} người thích</Typography>
      </CardContent>
      <Divider />
      <PostInteract isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} />
    </Card>
  )
}

export default PostCommon
