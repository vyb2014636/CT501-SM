import React from 'react'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'
import ListFollower from './ListFollowers/ListFollowers'
import LeftBar from './LeftBar/LeftBar'

const LeftSide = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Box
      sx={{
        width: isNonScreenMobile ? '450' : '100%',
        p: 2,
        display: { md: 'block' }
      }}>
      <LeftBar />
      {isNonScreenMobile && <ListFollower />}
    </Box>
  )
}

export default LeftSide
