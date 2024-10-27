import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import React from 'react'

const User = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <Outlet />
    </Box>
  )
}

export default User