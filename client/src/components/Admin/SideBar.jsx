import React from 'react'
import { Drawer, List, ListItemButton, Box, Avatar, Typography } from '@mui/material'
import Dashboard from '@mui/icons-material/Dashboard'
import Person from '@mui/icons-material/Person'
import Description from '@mui/icons-material/Description'
import Block from '@mui/icons-material/Block'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { useLocation, useNavigate } from 'react-router-dom'

// Logo component
const Logo = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <Avatar src='https://mui.com/static/logo.png' alt='Logo' sx={{ width: 48, height: 48 }} />
  </Box>
)

const menuItems = [
  { id: '1', text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
  { id: '2', text: 'Người dùng', icon: <Person />, path: '/admin/user' },
  { id: '3', text: 'Danh sách khiếu nại', icon: <Description />, path: '/admin/report' },
  { id: '4', text: 'Danh sách tố cáo', icon: <Block />, path: '/admin/complain' },
  { id: '5', text: 'Danh sách khóa', icon: <Block />, path: '/admin/block' }
]

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClickItem = (item) => {
    navigate(item.path)
  }

  // Kiểm tra xem đường dẫn hiện tại có khớp với đường dẫn trong menu không
  const isSelected = (itemPath) => {
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`)
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 240,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
      }}>
      <FlexColumn sx={{ justifyContent: '', pt: 4, color: '#0072E4' }}>
        <Logo />
        <Typography fontWeight='bold' variant='h5' textAlign='center' letterSpacing={1}>
          Quản trị
        </Typography>
      </FlexColumn>
      <List sx={{ p: 4 }}>
        {/* Menu Items */}
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleClickItem(item)}
            sx={{
              borderRadius: 1,
              m: 1,
              color: '#637381',
              typography: 'body2',
              gap: 2,
              fontWeight: 'fontWeightMedium'
            }}
            selected={isSelected(item.path) && !(item.id === '1' && location.pathname !== '/admin')} // Chỉ chọn Dashboard khi đang ở đúng đường dẫn của nó
          >
            <Box component='span' sx={{ width: 24, height: 24 }}>
              {item.icon}
            </Box>
            <Box
              component='span'
              flexGrow={1}
              sx={{
                letterSpacing: 1,
                lineHeight: 1.5
              }}>
              {item.text}
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
