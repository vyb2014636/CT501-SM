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
import MenuIcon from '@mui/icons-material/Menu'

const MenuMobile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

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
        <ListItem disablePadding onClick={() => navigate('/profile')}>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Tài khoản' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
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
    <div>
      <Button onClick={toggleDrawer(!open)}>
        <MenuIcon />
      </Button>
      <Drawer anchor='bottom' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
export default MenuMobile
