import React from 'react'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import { useMediaQuery } from '@mui/material'
import MenuMobile from '@components/Mobile/MenuMobile'
import Logo from '@/components/Common/Logo/Logo'
import Search from '@/components/Common/Input/Search'

const LeftBar = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <FlexBetween sx={{ gap: 2, p: 2, borderRadius: '12px' }}>
      <Logo />

      <Search />
      {!isNonScreenMobile && <MenuMobile />}
    </FlexBetween>
  )
}

export default LeftBar
