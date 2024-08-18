import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

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
