import React from 'react'
import Logo from '@/components/Common/Logo/Logo'
import MenuMobile from '@components/Mobile/MenuMobile'
import useMediaQuery from '@mui/material/useMediaQuery'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import SearchTextField from '@/components/Common/TextField/SearchTextField'

const LeftBar = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <FlexBetween sx={{ gap: 2, p: 2, borderRadius: '12px' }}>
      <Logo />

      <SearchTextField />
      {!isNonScreenMobile && <MenuMobile />}
    </FlexBetween>
  )
}

export default LeftBar
