import React from 'react'
import AccountButton from '@/components/IconsButton/AccountButton'
import ModeButton from '@/components/IconsButton/ModeButton'
import NoticeButton from '@/components/IconsButton/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
import { useLocation, useNavigate } from 'react-router-dom'
import MessageButton from '@/components/IconsButton/MessageButton'
import HomeButton from '@/components/IconsButton/HomeButton'

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
