import React, { useState } from 'react'
import { Drawer, List, ListItemButton, Box, Avatar, Typography, Collapse } from '@mui/material'
import { Dashboard, Person, Description, Block, ExpandLess, ExpandMore } from '@mui/icons-material'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { useLocation, useNavigate } from 'react-router-dom'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
const Logo = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <Avatar src='https://mui.com/static/logo.png' alt='Logo' sx={{ width: 48, height: 48 }} />
  </Box>
)

const menuItems = [
  { id: '1', text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
  { id: '2', text: 'Người dùng', icon: <Person />, path: '/admin/user' },
  {
    id: '3',
    text: 'Danh sách khiếu nại',
    icon: <Description />,
    path: '/admin/report',
    subItems: [
      { id: 'resolved', text: 'Danh sách đã xử lý', path: '/admin/report/resolved' },
      { id: 'pending', text: 'Danh sách chưa xử lý', path: '/admin/report/pending' }
    ]
  },
  {
    id: '4',
    text: 'Danh sách vi phạm',
    icon: <WarningAmberOutlinedIcon />,
    path: '/admin/violation',
    subItems: [
      { id: 'violation', text: 'Vi phạm do bị báo cáo', path: '/admin/violation/reported' },
      { id: 'violationSpam', text: 'Vi phạm do báo cáo sai', path: '/admin/violation/spamViolation' }
    ]
  },
  {
    id: '5',
    text: 'Lịch sử hoạt động',
    icon: <HistoryOutlinedIcon />,
    path: '/admin/history'
  }
]

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openSubItems, setOpenSubItems] = useState({})

  const handleClickItem = (item) => {
    navigate(item.path)
  }

  const toggleSubmenu = (id) => {
    setOpenSubItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const isSelected = (itemPath) => location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`)

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 300,
        '& .MuiDrawer-paper': { width: 300, boxSizing: 'border-box' }
      }}>
      <FlexColumn sx={{ pt: 4, color: '#0072E4', textAlign: 'center' }}>
        <Logo />
        <Typography fontWeight='bold' variant='h5' letterSpacing={1}>
          Quản trị
        </Typography>
      </FlexColumn>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <ListItemButton
              onClick={() => (item.subItems ? toggleSubmenu(item.id) : handleClickItem(item))}
              sx={{
                borderRadius: 1,
                m: 1,
                color: 'textColorSideBar.default',
                typography: 'body2',
                gap: 2,
                fontWeight: 'fontWeightMedium'
              }}
              selected={isSelected(item.path) && !(item.id === '1' && location.pathname !== '/admin')}>
              <Box component='span' sx={{ width: 24, height: 24 }}>
                {item.icon}
              </Box>
              <Typography flexGrow={1} sx={{ letterSpacing: 1 }}>
                {item.text}
              </Typography>
              {item.subItems && (openSubItems[item.id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {item.subItems && (
              <Collapse in={openSubItems[item.id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.id}
                      onClick={() => handleClickItem(subItem)}
                      sx={{
                        pl: 4,
                        m: 1,
                        ml: 4,
                        color: 'textColorSideBar.default',
                        typography: 'body2'
                      }}
                      selected={isSelected(subItem.path) && !(subItem.id === '1' && location.pathname !== '/admin')}>
                      <Typography>{subItem.text}</Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
