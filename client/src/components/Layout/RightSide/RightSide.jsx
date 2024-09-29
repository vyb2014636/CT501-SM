import React from 'react'
import Box from '@mui/material/Box'
import RightBar from './RightBar/RightBar'

const RightSide = ({ children }) => {
  return (
    <Box
      sx={{
        width: 400,
        p: 2,
        display: { xs: 'none', lg: 'block' }
      }}>
      <RightBar />
      {children}
    </Box>
  )
}

export default RightSide
