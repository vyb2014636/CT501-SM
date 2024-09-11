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
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { formatFullname } from '@/utils/helpers'
import { useSelector } from 'react-redux'
import renderMedia from '@/components/Common/Mansory/MansoryMedia'
import { useNavigate } from 'react-router-dom'

const PostCommon = ({ noMedia, post }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  return (
    <Card sx={{ mx: 'auto', my: 2, borderRadius: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <CardHeader
        avatar={
          <div onClick={() => navigate(`/${post?.byPost?._id}`)}>
            <Avatar src={post?.byPost?.avatar} alt='Profile Picture' sx={{ width: 52, height: 52, cursor: 'pointer' }} />
          </div>
        }
        action={
          <>
            <IconButton aria-={open ? 'option-post' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
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
              onClose={() => setAnchorEl(null)}>
              {post?.byPost._id === user._id && (
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <DeleteOutlinedIcon />
                  <Typography ml={1}>Xóa</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={() => setAnchorEl(null)}>
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
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      {/* Nội dung bài đăng */}
      <CardContent>
        <Typography variant='body1'>{post?.describe}❤️</Typography>
      </CardContent>
      {/* Hình ảnh trong bài đăng */}
      {!noMedia && renderMedia(post)}
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
  )
}

export default PostCommon
