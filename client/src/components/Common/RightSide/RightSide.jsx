import React from 'react'
import RightBar from './RightBar/RightBar'
import FlexColumn from '../Flex/FlexColumn'

const RightSide = ({ children }) => {
  return (
    <FlexColumn sx={{ display: { xs: 'none', lg: 'flex' }, p: 2, flex: 2 }}>
      <RightBar />
      {children}
    </FlexColumn>
  )
}

export default RightSide
