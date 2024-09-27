import AccountButton from '@/components/AppBar/Button/AccountMenu'
import HomeButton from '@/components/AppBar/Button/HomeButton'
import RequestButton from '@/components/AppBar/Button/RequestButton'
import ModeButton from '@/components/AppBar/Button/ModeButton'
import NoticeButton from '@/components/AppBar/Button/NoticeButton'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import React from 'react'

const RightBar = () => {
  return (
    <FlexBetween sx={{ gap: 2, my: 3 }}>
      <HomeButton />
      <ModeButton />
      <RequestButton />
      <NoticeButton />
      <AccountButton />
    </FlexBetween>
  )
}

export default RightBar
