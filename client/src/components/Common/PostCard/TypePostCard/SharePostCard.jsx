import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import ContentPostCard from '../ContentPostCard/ContentPostCard'
import InteractPostCard from '../InteractPostCard/InteractPostCard'
import HeaderPostCard from '../HeaderPostCard/HeaderPostCard'
import MediaPostCard from '../MediaPostCard/MediaPostCard'
import StatPostCard from '../StatPostCard/StatPostCard'

const SharePostCard = ({ noMedia, post, isLiked, handleClickLike, visibleMenu }) => {
  return (
    <>
      <Card sx={styleCardGeneral}>
        <HeaderPostCard userPost={post.byPost} post={post} visibleMenu={visibleMenu} />
        <ContentPostCard describe={post.describe} />
        {post?.sharedPost?.status === 'normal' ? (
          <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
            <HeaderPostCard userPost={post.sharedPost.byPost} post={post?.sharedPost} />
            <ContentPostCard describe={post.sharedPost.describe} />
            {!noMedia && MediaPostCard(post?.sharedPost)}
            <StatPostCard post={post?.sharedPost} />
          </Card>
        ) : (
          <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
            <Typography variant='body2' p={8}>
              Bài đăng đã bị ẩn hoặc đã xóa
            </Typography>
          </Card>
        )}

        {/* <MenuItem sx={{ p: 0 }}>
          <CardContent>
            <Typography variant='body2'>
              {post.likes?.length} người thích, {post.comments.length} Bình luận,
            </Typography>
          </CardContent>
        </MenuItem> */}
        <StatPostCard post={post} shared />

        <Divider />
        {post.status === 'normal' && (
          <InteractPostCard isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} post={post} />
        )}
      </Card>
    </>
  )
}

export default SharePostCard
