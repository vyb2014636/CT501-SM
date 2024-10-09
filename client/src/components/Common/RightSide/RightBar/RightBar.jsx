import FlexBetween from '@/components/Common/Flex/FlexBetween'
import React from 'react'
import HomeButton from './Button/HomeButton'
import ModeButton from './Button/ModeButton'
import RequestButton from './Button/RequestButton'
import NoticeButton from '../../../Notification/Button/NoticeButton'
import AccountButton from './Button/AccountMenu'

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
