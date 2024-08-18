import React from 'react'
import Box from '@mui/material/Box'
import SearchLogo from '@/components/SearchLogo/SearchLogo'
import { useMediaQuery } from '@mui/material'
import FollowerCard from '@/components/FollowerCard/FollowerCard'

const LeftSide = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Box
      sx={{
        width: isNonScreenMobile ? '350' : '100%',
        p: 2,
        display: { md: 'block' }
      }}>
      <SearchLogo />
      {isNonScreenMobile && <FollowerCard />}
    </Box>
  )
}

export default LeftSide
