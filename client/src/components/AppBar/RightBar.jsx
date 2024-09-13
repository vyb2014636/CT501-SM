import AccountButton from '@/components/Button/AccountMenu'
import HomeButton from '@/components/Button/HomeButton'
import ChatButton from '@/components/Button/ChatButton'
import ModeButton from '@/components/Button/ModeButton'
import NoticeButton from '@/components/Button/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
import React from 'react'

const RightBar = () => {
  return (
    <FlexBetween sx={{ gap: 2, my: 3 }}>
      <HomeButton />
      <ModeButton />
      <ChatButton />
      <NoticeButton />
      <AccountButton />
    </FlexBetween>
  )
}

export default RightBar
