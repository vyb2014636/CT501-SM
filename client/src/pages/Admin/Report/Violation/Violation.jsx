import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Violation = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <Outlet />
    </Box>
  )
}

export default Violation
