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
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import Masonry from '@mui/lab/Masonry'

const Post = ({ noMedia, post }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const renderMedia = () => {
    const videos = post?.videos ? post.videos.map((videoUrl) => ({ url: videoUrl, isVideo: true })) : []
    const images = post?.images ? post.images.map((imageUrl) => ({ url: imageUrl, isVideo: false })) : []

    let media = [...images, ...videos]
    const mediaCount = media?.length
    return (
      <>
        {mediaCount < 3 && (
          <Masonry columns={mediaCount === 1 ? 1 : 2} sx={{ mx: 0 }}>
            {media?.slice(0, 3).map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  m: 0
                }}>
                {image.isVideo ? (
                  <CardMedia
                    component='video'
                    src={image.url} // Dùng thuộc tính src cho video
                    controls // Thêm controls cho video
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                ) : (
                  <CardMedia
                    component='img'
                    image={image.url} // Dùng thuộc tính image cho hình ảnh
                    alt={`Post image ${index + 1}`}
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                )}
              </Box>
            ))}
          </Masonry>
        )}
        {/* Phần hiển thị 3 ảnh đầu tiên với 3 cột */}
        {mediaCount >= 3 && (
          <Masonry columns={3}>
            {media?.slice(0, 3).map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  m: 0
                }}>
                {image.isVideo ? (
                  <CardMedia
                    component='video'
                    src={image.url} // Dùng thuộc tính src cho video
                    controls // Thêm controls cho video
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                ) : (
                  <CardMedia
                    component='img'
                    image={image.url} // Dùng thuộc tính image cho hình ảnh
                    alt={`Post image ${index + 1}`}
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                )}
              </Box>
            ))}
          </Masonry>
        )}

        {/* Phần hiển thị 2 ảnh cuối với 2 cột */}
        {mediaCount > 3 && (
          <Masonry columns={2}>
            {media?.slice(3, 5).map((image, index) => (
              <Box
                key={index + 3} // Cộng thêm 3 để đảm bảo index là duy nhất
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  m: 0
                }}>
                {image.isVideo ? (
                  <CardMedia
                    component='video'
                    src={image.url} // Dùng thuộc tính src cho video
                    controls // Thêm controls cho video
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                ) : (
                  <CardMedia
                    component='img'
                    image={image.url} // Dùng thuộc tính image cho hình ảnh
                    alt={`Post image ${index + 1}`}
                    sx={{ width: '100%', objectFit: 'contain', height: mediaCount === 1 ? 'auto' : '240px' }}
                  />
                )}
                {mediaCount > 5 && index === 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => alert('Show more images')}>
                    <Typography variant='h4' color='white'>
                      +{mediaCount - 5}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Masonry>
        )}
      </>
    )
  }

  return (
    <Card sx={{ mx: 'auto', my: 2, borderRadius: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      {/* Header bài đăng */}
      <CardHeader
        avatar={<Avatar src={post?.byPost?.avatar} alt='Profile Picture' sx={{ width: 52, height: 52 }} />}
        action={
          <div>
            <IconButton aria-controls={open ? 'option-post' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
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
            {post?.byPost?.fullname}
          </Typography>
        }
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      {/* Nội dung bài đăng */}
      <CardContent>
        <Typography variant='body1'>{post?.describe}❤️</Typography>
      </CardContent>
      {/* Hình ảnh trong bài đăng */}
      {!noMedia && renderMedia()}
      <Divider />
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
