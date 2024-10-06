import React, { useState } from 'react'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { formatFullname } from '@/utils/helpers'
import { useSelector } from 'react-redux'
import { avatarStyleMui, titleAvatarStyleMui } from '@/styles/styles'
const HeaderPostCard = ({ userPost, post, visibleMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleProfileClick = useProfileNavigation()
  return (
    <CardHeader
      sx={{ py: 2 }}
      avatar={
        <Avatar
          src={userPost.avatar}
          alt='Profile Picture'
          sx={{ width: 44, height: 44, ...avatarStyleMui }}
          onClick={() => handleProfileClick(userPost._id)}
        />
      }
      title={
        <Typography variant='h6' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(userPost._id)}>
          {formatFullname(userPost.firstname, userPost.lastname)}
        </Typography>
      }
      action={
        visibleMenu && (
          <>
            <IconButton aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
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
              {userPost._id === user._id && (
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
        )
      }
      subheader={new Date(post.createdAt).toLocaleString()}
    />
  )
}

export default HeaderPostCard