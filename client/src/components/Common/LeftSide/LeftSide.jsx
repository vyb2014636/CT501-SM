import React from 'react'
import LeftBar from './LeftBar/LeftBar'
import FlexColumn from '../Flex/FlexColumn'
import useMediaQuery from '@mui/material/useMediaQuery'

const LeftSide = ({ children }) => {
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')

  return (
    <FlexColumn sx={{ display: isNonScreenMobile ? 'flex' : 'none', p: 2, flex: 2, height: 1 }}>
      <LeftBar />
      {children}
    </FlexColumn>
  )
}

export default LeftSide
