import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import IconButton from '@mui/material/IconButton'
import { useLocation, useNavigate } from 'react-router-dom'
const HomeButton = () => {
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
    <IconButton onClick={handleAlwaylsReload}>
      <HomeOutlinedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}

export default HomeButton
