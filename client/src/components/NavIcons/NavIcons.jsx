import React from 'react'
import AccountButton from '@/components/Button/AccountButton'
import ModeButton from '@/components/Button/ModeButton'
import NoticeButton from '@/components/Button/NoticeButton'
import FlexBetween from '@/components/Flex/FlexBetween'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import IconButton from '@mui/material/IconButton'
import { useLocation, useNavigate } from 'react-router-dom'
const NavIcons = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleAlwaylsReload = () => {
    if (location.pathname === '/') {
      window.location.reload()
    } else {
      navigate('/')
    }
  }
  return (
    <FlexBetween sx={{ gap: 2, my: 3 }}>
      <IconButton onClick={handleAlwaylsReload}>
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
