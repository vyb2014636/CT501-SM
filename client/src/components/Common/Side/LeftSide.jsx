import React from 'react'
import Box from '@mui/material/Box'
import LeftBar from '@/components/AppBar/LeftBar'

const LeftSide = ({ children }) => {
  return (
    <Box sx={{ display: { xs: 'none', lg: 'block' }, flex: '2', p: 2 }}>
      <LeftBar />
      {children}
    </Box>
  )
}

export default LeftSide
