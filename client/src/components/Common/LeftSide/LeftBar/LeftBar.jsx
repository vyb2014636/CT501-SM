import React from 'react'
import MenuMobile from '@components/Mobile/MenuMobile'
// import useMediaQuery from '@mui/material/useMediaQuery'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import Logo from './Logo'
import SearchTextField from '../../../Search/SearchTextField'

const LeftBar = () => {
  return (
    <FlexBetween sx={{ gap: 2, p: 2 }}>
      <Logo />
      <SearchTextField />
    </FlexBetween>
  )
}

export default LeftBar
