import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Logout from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import ListItemIcon from '@mui/material/ListItemIcon'
import { logout } from '@/features/auth/authThunk'
import { resetPostState } from '@/features/post/postSlice'
import { resetCommentState } from '@/features/comment/commentSlice'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import { resetFriendship } from '@/features/request/friendshipSlice'
import { disconnectUser } from '@/services/socket'
import { resetStateChat } from '@/features/chat/chatSlice'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined'
const styleTriangle = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
}

const AccountButton = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    dispatch(resetPostState())
    dispatch(resetCommentState())
    dispatch(resetNotificationState())
    dispatch(resetFriendship())
    dispatch(resetStateChat())
    disconnectUser()
    dispatch(logout())
  }

  return (
    <>
      <Tooltip title='Tài khoản'>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          size='small'>
          <Avatar src={user && user.avatar} sx={{ height: '32px', width: '32px' }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={styleTriangle}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => navigate(`/personal`)}>
          <Avatar src={user && user.avatar} /> Tài khoản của tôi
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => navigate(`/settings`)}>
          <ListItemIcon>
            <LockPersonOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Trung tâm tài khoản
        </MenuItem>

        <MenuItem onClick={() => navigate(`/favorite`)}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Yêu thích
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountButton
