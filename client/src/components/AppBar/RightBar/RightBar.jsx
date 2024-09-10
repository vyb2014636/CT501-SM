import AccountButton from '@/components/Button/AccountButton'
import HomeButton from '@/components/Button/HomeButton'
import MessageButton from '@/components/Button/MessageButton'
import ModeButton from '@/components/Button/ModeButton'
import NoticeButton from '@/components/Button/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
import React from 'react'

const RightBar = () => {
  return (
    <FlexBetween sx={{ gap: 2, my: 3 }}>
      <HomeButton />
      <ModeButton />
      <MessageButton />
      <NoticeButton />
      <AccountButton />
    </FlexBetween>
  )
}

export default RightBar
