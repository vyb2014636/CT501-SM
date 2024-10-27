import React from 'react'
import Sidebar from '../../components/Admin/SideBar'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Admin/Header'

const Admin = () => {
  return (
    <Box display='flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  )
}
export default Admin
