import AccountButton from '@/components/Button/AccountMenu'
import HomeButton from '@/components/Button/HomeButton'
import RequestButton from '@/components/Button/RequestButton'
import ModeButton from '@/components/Button/ModeButton'
import NoticeButton from '@/components/Button/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
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
