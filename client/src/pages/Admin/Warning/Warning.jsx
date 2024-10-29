import React from 'react'
import { Box } from '@mui/material'
import WarningTable from './WarningsTable'
import { Outlet } from 'react-router-dom'

const Warning = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <Outlet />
    </Box>
  )
}

export default Warning
