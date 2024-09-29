import React, { useState } from 'react'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import ViewAvatarModal from '@components/user/Modal/ViewAvatarModel'
import EditAvatarModal from '@components/user/Modal/EditAvatarModal'
import EditBackgroundModal from '@components/user/Modal/EditBackgroundModal'
import img from '@/assets/postPic1.jpg'

const MyAvartarBackground = ({ user, myCardProfile }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openViewAvatar, setOpenViewAvatar] = useState(false)
  const [openEditAvatar, setOpenEditAvatar] = useState(false)
  const [openEditBackground, setOpenEditBackground] = useState(false)
  const open = Boolean(anchorEl)

  const handleOpenViewAvatar = () => setOpenViewAvatar(true)
  const handleOpenEditAvatar = () => setOpenEditAvatar(true)
  const handleOpenEditBackground = () => setOpenEditBackground(true)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('${user.background || img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          borderRadius: '12px 12px 0 0',
          position: 'relative'
        }}>
        <Avatar
          id='avatar-edit-button'
          aria-controls={open ? 'avatar-edit-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          src={user?.avatar}
          sx={{
            width: 80,
            height: 80,
            border: '2px solid',
            borderColor: 'background.paper',
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            '&:hover': {
              filter: 'brightness(0.7)',
              transition: 'filter 0.3s ease'
            }
          }}
        />
        <Menu
          id='avatar-edit-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'avatar-edit-button'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <MenuItem onClick={handleOpenViewAvatar} sx={{ gap: 2 }}>
            <AccountBoxOutlinedIcon />
            <Typography fontWeight={1000}>Xem ảnh</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenEditAvatar} sx={{ gap: 2 }}>
            <PhotoLibraryOutlinedIcon />
            <Typography fontWeight={1000}> Chỉnh sửa ảnh đại diện</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenEditBackground} sx={{ gap: 2 }}>
            <WallpaperOutlinedIcon />
            <Typography fontWeight={1000}>Chỉnh sửa ảnh bìa</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <ViewAvatarModal openViewAvatar={openViewAvatar} setOpenViewAvatar={setOpenViewAvatar} avatar={user.avatar} />
      <EditAvatarModal openModal={openEditAvatar} setOpenModal={setOpenEditAvatar} myId={user._id} />
      <EditBackgroundModal openModal={openEditBackground} setOpenModal={setOpenEditBackground} myId={user._id} />
    </>
  )
}

export default MyAvartarBackground
