import Box from '@mui/material/Box'
import React from 'react'
import ReportTable from '../User/Content/ReportTable'

const Report = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <ReportTable />
    </Box>
  )
}

export default Report
