import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate('/', { state: { refresh: true } })}>
      <HomeOutlinedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}

export default HomeButton
