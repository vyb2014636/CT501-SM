import Box from '@mui/material/Box'
import React from 'react'
import ReportTable from './Reports/Resolved/ResolvedReports'
import { Outlet } from 'react-router-dom'

const Report = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <Outlet />
    </Box>
  )
}

export default Report
