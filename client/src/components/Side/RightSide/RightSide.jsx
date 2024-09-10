import React from 'react'
import Box from '@mui/material/Box'
import RightBar from '@/components/AppBar/RightBar/RightBar'

const RightSide = ({ children }) => {
  return (
    <Box
      sx={{
        width: 400,
        p: 2,
        display: { xs: 'none', lg: 'block' },
        position: 'sticky',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
      <RightBar />
      {children}
    </Box>
  )
}

export default RightSide
