import React, { useState } from 'react'
import Sidebar from '../../components/Admin/SideBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Admin/Header'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { scrollbarStyleMui } from '@/styles/styles'

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <Box display='flex' height='100vh'>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 300,
          flexShrink: 0
        }}>
        <Sidebar />
      </Box>

      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 300 }
        }}>
        <Sidebar />
      </Drawer>

      <FlexColumn sx={{ flexGrow: 1, width: 1 }} alignItems='center'>
        <Header handleDrawerToggle={handleDrawerToggle} />

        <Box sx={{ width: 1, mt: 4, px: 3, overflow: 'auto', ...scrollbarStyleMui }}>
          <Box sx={{ backgroundColor: 'background.paper', borderRadius: 4, p: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </FlexColumn>
    </Box>
  )
}

export default Admin
