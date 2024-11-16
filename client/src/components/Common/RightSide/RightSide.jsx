import React from 'react'
import RightBar from './RightBar/RightBar'
import FlexColumn from '../Flex/FlexColumn'
import useMediaQuery from '@mui/material/useMediaQuery'

const RightSide = ({ children }) => {
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')

  return (
    <FlexColumn sx={{ display: isNonScreenMobile ? 'flex' : 'none', p: 2, flex: 2, height: 1 }}>
      <RightBar />
      {children}
    </FlexColumn>
  )
}

export default RightSide
