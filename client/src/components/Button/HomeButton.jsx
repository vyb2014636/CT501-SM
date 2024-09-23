import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPostState } from '@/features/post/postSlice'

const HomeButton = () => {
  const navigate = useNavigate()
  const handleAlwaylsReload = () => {
    navigate('/', { state: { refresh: true } })
  }
  return (
    <IconButton onClick={handleAlwaylsReload}>
      <HomeOutlinedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}

export default HomeButton
