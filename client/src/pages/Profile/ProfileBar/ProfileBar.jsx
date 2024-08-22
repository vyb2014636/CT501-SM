import React from 'react'
import FlexBetween from '@/components/Flex/FlexBetween'
import LeftBar from '@/pages/Home/LeftSide/LeftBar/LeftBar'
import RightBar from '@/pages/Home/RightSide/RightBar/RightBar'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'

const ProfileBar = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <FlexBetween sx={{ height: (theme) => theme.myApp.heightHeader }}>
      <Box width={isNonScreenMobile ? '60%' : '100%'}>
        <LeftBar />
      </Box>
      {isNonScreenMobile && (
        <Box width={350}>
          <RightBar />
        </Box>
      )}
    </FlexBetween>
  )
}

export default ProfileBar
