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

const PostShare = ({ noMedia, post }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card sx={{ mx: 'auto', my: 2, borderRadius: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        <CardHeader
          avatar={
            <div onClick={() => navigate(`/${post?.byPost?._id}`)}>
              <Avatar src={post?.byPost?.avatar} alt='Profile Picture' sx={{ width: 52, height: 52, cursor: 'pointer' }} />
            </div>
          }
          action={
            <>
              <IconButton
                aria-={open ? 'option-post' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='option-post'
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                onClose={handleClose}>
                {post?.byPost._id === user._id && (
                  <MenuItem onClick={handleClose}>
                    <DeleteOutlinedIcon />
                    <Typography ml={1}>Xóa</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                  <FavoriteBorderOutlinedIcon />
                  <Typography ml={1}>Yêu thích</Typography>
                </MenuItem>
              </Menu>
            </>
          }
          title={
            <Typography variant='h6' fontWeight='bold'>
              {formatFullname(post?.byPost?.firstname, post?.byPost?.lastname)}
            </Typography>
          }
          subheader={new Date(post?.createdAt).toLocaleString()}
        />
        <Card sx={{ mx: 'auto', m: 2, borderRadius: '16px', border: '1px solid', borderColor: 'background.default' }}>
          {/* Header bài đăng */}
          <CardHeader
            avatar={
              <div onClick={() => navigate(`/${post?.sharedPost?.byPost?._id}`)}>
                <Avatar src={post?.sharedPost?.byPost.avatar} alt='Profile Picture' sx={{ width: 52, height: 52, cursor: 'pointer' }} />
              </div>
            }
            title={
              <Typography variant='h6' fontWeight='bold'>
                {formatFullname(post?.sharedPost?.byPost?.firstname, post?.sharedPost?.byPost?.lastname)}
              </Typography>
            }
            subheader={new Date(post?.sharedPost.createdAt).toLocaleString()}
          />
          {/* Nội dung bài đăng */}
          <CardContent>
            <Typography variant='body1'>{post?.sharedPost.describe}❤️</Typography>
          </CardContent>
          {/* Hình ảnh trong bài đăng */}
          {!noMedia && renderMedia(post?.sharedPost)}
        </Card>
        <CardContent>
          <Typography variant='body2'>Bạn bè và những người khác</Typography>
        </CardContent>
        <Divider />
        {/* Lượt thích, bình luận, chia sẻ */}
        <CardActions disableSpacing sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }} width='100%'>
            <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <ThumbUpIcon color='primary' />
              <Typography variant='body1' fontWeight='bold'>
                Thích
              </Typography>
            </Button>

            <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <ChatBubbleOutlineIcon />
              <Typography variant='body1' fontWeight='bold'>
                Bình luận
              </Typography>
            </Button>

            <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <ShareIcon />
              <Typography variant='body1' fontWeight='bold'>
                Chia sẻ
              </Typography>
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  )
}

export default PostShare
