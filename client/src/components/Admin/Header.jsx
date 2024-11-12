import { Box, IconButton, Avatar } from '@mui/material'
import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import { useDispatch } from 'react-redux'
import { disconnectUser } from '@/services/socket'
import { resetPostState } from '@/features/post/postSlice'
import { resetCommentState } from '@/features/comment/commentSlice'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import { resetFriendship } from '@/features/request/friendshipSlice'
import { resetStateChat } from '@/features/chat/chatSlice'
import { logout } from '@/features/auth/authThunk'
import ModeButton from '@/components/Common/RightSide/RightBar/Button/ModeButton'

const Header = () => {
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
    <Box sx={{ textAlign: 'end' }}>
      <ModeButton />

      <IconButton
        aria-describedby={id}
        sx={{
          p: '2px',
          width: 40,
          height: 40
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
              cài đặt
            </Box>
          </MenuItem>
          {/* ))} */}
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
