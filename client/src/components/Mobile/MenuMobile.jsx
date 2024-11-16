import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemButton from '@mui/material/ListItemButton'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/authThunk'
import { resetPostState } from '@/features/post/postSlice'
import { resetCommentState } from '@/features/comment/commentSlice'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import { resetFriendship } from '@/features/request/friendshipSlice'
import { disconnectUser } from '@/services/socket'
import { resetStateChat } from '@/features/chat/chatSlice'
import HomeButton from '../Common/RightSide/RightBar/Button/HomeButton'
import FlexBetween from '../Common/Flex/FlexBetween'
import Logo from '../Common/LeftSide/LeftBar/Logo'
import FlexCenter from '../Common/Flex/FlexCenter'
import FlexRow from '../Common/Flex/FlexRow'
import NoticeButton from '../Notification/Button/NoticeButton'
import ModeButton from '../Common/RightSide/RightBar/Button/ModeButton'
import RequestButton from '../Common/RightSide/RightBar/Button/RequestButton'
import ChatButton from '../Common/RightSide/RightBar/Button/ChatButton'

const MenuMobile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    dispatch(resetPostState())
    dispatch(resetCommentState())
    dispatch(resetNotificationState())
    dispatch(resetFriendship())
    dispatch(resetStateChat())
    disconnectUser()
    dispatch(logout())
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box
      sx={{
        width: 'auto'
      }}
      role='presentation'
      onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding onClick={() => navigate('/personal')}>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Tài khoản của tôi' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate('/settings')}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Trung tâm tài khoản' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate('/favorite')}>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Yêu thích' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Đăng xuất' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      {!isNonScreenMobile && (
        <FlexBetween py={2}>
          <FlexCenter>
            <Logo />
          </FlexCenter>
          <FlexRow>
            <HomeButton />
            <RequestButton />
            <ChatButton />
            <NoticeButton />
            <Button onClick={toggleDrawer(!open)}>
              <MenuIcon />
            </Button>
          </FlexRow>
        </FlexBetween>
      )}
      <Drawer anchor='bottom' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )
}

export default MenuMobile
