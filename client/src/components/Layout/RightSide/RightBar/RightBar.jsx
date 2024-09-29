import React from 'react'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import HomeButton from '@/components/Common/Button/HomeButton'
import ModeButton from '@/components/Common/Button/ModeButton'
import NoticeButton from '@/components/Common/Button/NoticeButton'
import AccountButton from '@/components/Common/Button/AccountMenu'
import RequestButton from '@/components/Common/Button/RequestButton'

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
