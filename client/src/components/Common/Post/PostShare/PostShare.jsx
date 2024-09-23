import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { formatFullname } from '@/utils/helpers'
import { useSelector } from 'react-redux'
import renderMedia from '@/components/Common/Mansory/MansoryMedia'
import { useNavigate } from 'react-router-dom'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import FlexRow from '@/components/Flex/FlexRow'
import { styleCardGeneral, styleThreeButton } from '@/styles/stylePost/style'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import PostHeader from '../PostHeader/PostHeader'
import PostContent from '../PostContent/PostContent'
import PostInteract from '../PostInteract/PostInteract'

const PostShare = ({ noMedia, post, isLiked, handleClickLike }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)

  const handleProfileClick = useProfileNavigation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card sx={styleCardGeneral}>
        <PostHeader userPost={post.byPost} post={post} visibleMenu />
        <PostContent describe={post.describe} />

        <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
          <PostHeader userPost={post.sharedPost.byPost} post={post?.sharedPost} />
          <PostContent describe={post.sharedPost.describe} />
          {!noMedia && renderMedia(post?.sharedPost)}
        </Card>

        <CardContent>
          <Typography variant='body2'>{post.likes?.length} người thích</Typography>
        </CardContent>
        <Divider />
        <PostInteract isLiked={isLiked} handleClickLike={handleClickLike} styleThreeButton={styleThreeButton} />
      </Card>
    </>
  )
}

export default PostShare
