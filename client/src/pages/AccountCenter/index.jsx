import React, { useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, ListItemIcon } from '@mui/material'
import Logo from '@/components/Common/LeftSide/LeftBar/Logo'
import Sercurity from './Sercurity/Sercurity'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import FlexRow from '@/components/Common/Flex/FlexRow'

const menuItems = [
  {
    key: 'info',
    label: 'Thông tin tài khoản',
    icon: <PermContactCalendarOutlinedIcon />,
    content: (
      <Box>
        <Typography variant='h5' gutterBottom>
          Thông tin tài khoản
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          Đây là thông tin tài khoản của bạn.
        </Typography>
      </Box>
    )
  },
  {
    key: 'security',
    label: 'Bảo mật',
    icon: <ShieldOutlinedIcon />,
    content: <Sercurity />
  },
  {
    key: 'settings',
    label: 'Cài đặt khác',
    icon: <ShieldOutlinedIcon />,
    content: (
      <Box>
        <Typography variant='h5' gutterBottom>
          Cài đặt khác
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          Các cài đặt khác cho tài khoản của bạn.
        </Typography>
      </Box>
    )
  }
]

const AccountCenter = () => {
  const [selectedMenu, setSelectedMenu] = useState('info')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', height: '100vh', bgcolor: 'background.default', justifyContent: 'center' }}>
      <FlexRow height={1} width='60%'>
        {/* Sidebar */}
        <Box
          sx={{
            width: '350px',
            padding: '20px',
            height: 1,
            borderRight: '1px solid #ccc' // Thêm border right màu xám
          }}>
          <Logo />
          <Typography variant='h6' gutterBottom>
            Trung tâm tài khoản
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.key} sx={{ py: 1 }} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedMenu(item.key)}
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
                  <ListItemIcon sx={{ color: selectedMenu === item.key ? '#fff' : 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        {/* Nội dung chính */}
        <Box sx={{ flex: 1, p: 8, height: 1 }}>{menuItems.find((item) => item.key === selectedMenu)?.content}</Box>
      </FlexRow>
    </Box>
  )
}

export default AccountCenter
