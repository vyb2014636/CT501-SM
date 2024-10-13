import React from 'react'
import LeftBar from './LeftBar/LeftBar'
import FlexColumn from '../Flex/FlexColumn'

const LeftSide = ({ children }) => {
  return (
    <FlexColumn sx={{ display: { xs: 'none', lg: 'flex' }, p: 2, flex: 2 }}>
      <LeftBar />
      {children}
    </FlexColumn>
  )
}

export default LeftSide
