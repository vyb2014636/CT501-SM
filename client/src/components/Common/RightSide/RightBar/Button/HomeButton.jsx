import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Tooltip } from '@mui/material'

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <Tooltip title='Trang chủ'>
      <IconButton onClick={() => navigate('/', { state: { refresh: true } })}>
        <HomeOutlinedIcon color='primary' fontSize='medium' />
      </IconButton>
    </Tooltip>
  )
}

export default HomeButton
