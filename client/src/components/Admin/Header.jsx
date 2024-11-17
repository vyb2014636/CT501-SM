import React, { useState } from 'react'
import { Box, IconButton, Avatar, Popover, Typography, Button, Divider, MenuList, MenuItem } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import { disconnectUser } from '@/services/socket'
import { resetPostState } from '@/features/post/postSlice'
import { resetCommentState } from '@/features/comment/commentSlice'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import { resetFriendship } from '@/features/request/friendshipSlice'
import { resetStateChat } from '@/features/chat/chatSlice'
import { logout } from '@/features/auth/authThunk'
import ModeButton from '@/components/Common/RightSide/RightBar/Button/ModeButton'

const Header = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)
  const id = openPopover ? 'simple-popover' : undefined

  const handleLogout = () => {
    disconnectUser()
    dispatch(resetPostState())
    dispatch(resetCommentState())
    dispatch(resetNotificationState())
    dispatch(resetFriendship())
    dispatch(resetStateChat())
    dispatch(logout())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4 },
        py: 1,
        boxShadow: 1,
        bgcolor: 'background.paper',
        position: 'sticky',
        top: 0,
        width: 1
      }}>
      {/* Nút menu cho mobile */}
      <IconButton
        sx={{
          display: { xs: 'flex', md: 'none' } // Hiện trên mobile, ẩn trên desktop
        }}
        onClick={handleDrawerToggle} // Gọi hàm mở Sidebar
      >
        <MenuIcon />
      </IconButton>

      {/* ModeButton - luôn hiển thị */}
      <ModeButton />

      {/* Avatar và Popover */}
      <IconButton
        aria-describedby={id}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          ml: 'auto' // Đẩy Avatar về bên phải
        }}
        onClick={handleOpenPopover}>
        <Avatar sx={{ heigh: 1, width: 1 }} />
      </IconButton>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 }
          }
        }}>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start'
          }}>
          <MenuItem>
            <HomeOutlinedIcon />
            <Box component='span' p={2}>
              Home
            </Box>
          </MenuItem>
          <MenuItem>
            <AccountBoxOutlinedIcon />
            <Box component='span' p={2}>
              Tài khoản
            </Box>
          </MenuItem>
          <MenuItem>
            <SettingsOutlinedIcon />
            <Box component='span' p={2}>
              Cài đặt
            </Box>
          </MenuItem>
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color='error' size='medium' variant='text' onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}

export default Header
