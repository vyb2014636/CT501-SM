import React from 'react'
import AccountButton from '@/components/Button/AccountButton'
import ModeButton from '@/components/Button/ModeButton'
import NoticeButton from '@/components/Button/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import IconButton from '@mui/material/IconButton'
const NavIcons = () => {
  return (
    <FlexBetween sx={{ gap: 2, my: 3 }}>
      <IconButton>
        <HomeOutlinedIcon color='primary' fontSize='medium' />
      </IconButton>
      <ModeButton />
      <IconButton>
        <ChatBubbleOutlineOutlinedIcon color='primary' fontSize='medium' />
      </IconButton>
      <NoticeButton />
      <AccountButton />
    </FlexBetween>
  )
}

export default NavIcons
