import React from 'react'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'
import LeftBar from '@/components/AppBar/LeftBar'

const LeftSide = ({ children }) => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Box
      sx={{
        width: isNonScreenMobile ? '350' : '100%',
        p: 2,
        display: { md: 'block' }
      }}>
      <LeftBar />
      {isNonScreenMobile && children}
    </Box>
  )
}

export default LeftSide
