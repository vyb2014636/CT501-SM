import React, { useState } from 'react'
import img from '@/assets/postPic1.jpg'
import { Avatar, Box, Button, Popover, Typography } from '@mui/material'
import FlexColumn from '@/components/Flex/FlexColumn'
import ButtonFlexStar from '@/components/Button/ButtonFlexStar'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import ModalAvartar from '@/components/Modal/ModalAvartar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ModalEditAvartar from '@/components/Modal/ModalEditAvatar'

const MyAvartarBackground = ({ user, myCardProfile }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openViewAvatar, setOpenViewAvatar] = useState(false)
  const [openEditAvatar, setOpenEditAvatar] = useState(false)

  const handleOpenViewAvatar = () => setOpenViewAvatar(true)
  const handleOpenEditAvatar = () => setOpenEditAvatar(true)

  const open = Boolean(anchorEl)
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
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50%',
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
          <MenuItem sx={{ gap: 2 }}>
            <WallpaperOutlinedIcon />
            <Typography fontWeight={1000}>Chỉnh sửa ảnh bìa</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <ModalAvartar openViewAvatar={openViewAvatar} setOpenViewAvatar={setOpenViewAvatar} avatar={user.avatar} />
      <ModalEditAvartar openModal={openEditAvatar} setOpenModal={setOpenEditAvatar} myId={user._id} />
    </>
  )
}

export default MyAvartarBackground
