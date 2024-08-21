import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
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
import avatar from '@/img/imgF1.png'
import img from '@/img/postPic1.jpg'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
const Post = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card sx={{ mx: 'auto', my: 2, borderRadius: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      {/* Header bài đăng */}

      <CardHeader
        avatar={<Avatar src={avatar} alt='Profile Picture' sx={{ width: 52, height: 52 }} />}
        action={
          <div>
            <IconButton
              aria-controls={open ? 'option-post' : undefined}
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
              <MenuItem onClick={handleClose}>
                <DeleteOutlinedIcon />
                <Typography ml={1}>Xóa</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FavoriteBorderOutlinedIcon />
                <Typography ml={1}>Yêu thích</Typography>
              </MenuItem>
            </Menu>
          </div>
        }
        title={
          <Typography variant='h6' fontWeight='bold'>
            Con Cưng
          </Typography>
        }
        subheader='6 ngày trước'
      />
      {/* Nội dung bài đăng */}
      <CardContent>
        <Typography variant='body1'>Bạn sẽ không bao giờ hối hận khi thích bức ảnh này ❤️</Typography>
      </CardContent>

      {/* Hình ảnh trong bài đăng */}
      <CardMedia component='img' height='500' image={img} alt='Post image' />
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

export default Post
