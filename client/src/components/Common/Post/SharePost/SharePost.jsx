import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import renderMedia from '@/components/Common/Post/MediaPost/MediaPost'
import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import HeaderPost from '../HeaderPost/HeaderPost'
import ContentPost from '../ContentPost/ContentPost'
import InteractPost from '../InteractPost/InteractPost'

const SharePost = ({ noMedia, post, isLiked, handleClickLike }) => {
  return (
    <>
      <Card sx={styleCardGeneral}>
        <HeaderPost userPost={post.byPost} post={post} visibleMenu />
        <ContentPost describe={post.describe} />

        <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
          <HeaderPost userPost={post.sharedPost.byPost} post={post?.sharedPost} />
          <ContentPost describe={post.sharedPost.describe} />
          {!noMedia && renderMedia(post?.sharedPost)}
        </Card>

        <CardContent>
          <Typography variant='body2'>{post.likes?.length} người thích</Typography>
        </CardContent>
        <Divider />
        <InteractPost isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} post={post} />
      </Card>
    </>
  )
}

export default SharePost
