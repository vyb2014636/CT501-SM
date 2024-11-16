import React from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Tooltip } from '@mui/material'

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <Tooltip title='Trang chủ'>
      <MenuItem onClick={() => navigate('/', { state: { refresh: true } })}>
        <HomeOutlinedIcon color='primary' fontSize='medium' />
      </MenuItem>
    </Tooltip>
  )
}

export default HomeButton
