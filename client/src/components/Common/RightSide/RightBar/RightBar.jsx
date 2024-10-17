import FlexBetween from '@/components/Common/Flex/FlexBetween'
import React from 'react'
import HomeButton from './Button/HomeButton'
import ModeButton from './Button/ModeButton'
import RequestButton from './Button/RequestButton'
import NoticeButton from '../../../Notification/Button/NoticeButton'
import AccountButton from './Button/AccountMenu'
import ChatButton from './Button/ChatButton'

const RightBar = () => {
  return (
    <FlexBetween sx={{ gap: 2, p: 2, height: (theme) => theme.myApp.heighHeader }}>
      <HomeButton />
      <ModeButton />
      <RequestButton />
      <ChatButton />
      <NoticeButton />
      <AccountButton />
    </FlexBetween>
  )
}

export default RightBar
