import React, { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '@/components/Common/LeftSide/LeftBar/Logo'
import Sercurity from './Sercurity/Sercurity'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import Information from './Infomation/Information'
import Trash from '../Home/Trash/Trash'
import useMediaQuery from '@mui/material/useMediaQuery'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const menuItems = [
  {
    key: 'info',
    label: 'Thông tin tài khoản',
    icon: <PermContactCalendarOutlinedIcon />,
    content: <Information />
  },
  {
    key: 'security',
    label: 'Bảo mật',
    icon: <ShieldOutlinedIcon />,
    content: <Sercurity />
  },
  {
    key: 'settings',
    label: 'Thùng rác',
    icon: <DeleteOutlinedIcon />,
    content: <Trash />
  }
]

const AccountCenter = () => {
  const [selectedMenu, setSelectedMenu] = useState('info')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const renderMenu = (
    <>
      <Logo />
      <Typography variant='h6' gutterBottom>
        Trung tâm tài khoản
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} sx={{ py: 1 }} disablePadding>
            <ListItemButton
              onClick={() => {
                setSelectedMenu(item.key)
                if (isSmallScreen) toggleDrawer()
              }}
              sx={{
                backgroundColor: selectedMenu === item.key ? '#344854' : 'transparent',
                color: selectedMenu === item.key ? '#fff' : 'inherit',
                border: selectedMenu === item.key ? '2px solid #344854' : 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#344854',
                  color: '#fff'
                }
              }}>
              <ListItemIcon
                sx={{
                  color: selectedMenu === item.key ? '#fff' : 'inherit'
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  typography: {
                    fontSize: isSmallScreen ? '12px' : '16px'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
        flexDirection: isSmallScreen ? 'column' : 'row',
        width: { sx: 1, md: '70%' },
        mx: 'auto',
        minHeight: '100vh',
        height: '100vh',
        bgcolor: 'background.default',
        justifyContent: 'center'
      }}>
      {isSmallScreen ? (
        <>
          {/* AppBar for small screens */}
          <AppBar position='static' color='default' elevation={1}>
            <Toolbar>
              <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant='h6'>Trung tâm tài khoản</Typography>
            </Toolbar>
          </AppBar>

          {/* Drawer for small screens */}
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                padding: 2
              }}
              role='presentation'>
              {renderMenu}
            </Box>
          </Drawer>
        </>
      ) : (
        // Sidebar for larger screens
        <Box
          sx={{
            // width: { sx: '100px', md: '350px' },
            flex: 3,
            padding: '20px',
            height: 1,
            borderRight: '1px solid #ccc'
          }}>
          {renderMenu}
        </Box>
      )}

      <Box
        sx={{
          flex: 7,
          p: isSmallScreen ? 3 : 8
        }}>
        {menuItems.find((item) => item.key === selectedMenu)?.content}
      </Box>
    </Box>
  )
}

export default AccountCenter
