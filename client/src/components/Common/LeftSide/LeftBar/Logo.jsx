import React from 'react'
import { Box, SvgIcon, Typography } from '@mui/material'
import { ReactComponent as socialIcon } from '@/assets/logoIcon.svg'
import { useNavigate } from 'react-router-dom'
import FlexRow from '../../Flex/FlexRow'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <FlexRow onClick={() => navigate('/')} sx={{ cursor: 'pointer', flex: 2 }}>
      <SvgIcon component={socialIcon} inheritViewBox fontSize='large' color='primary' />
      <Typography fontWeight='bold' fontSize='clamp(1rem,1.7rem,2.25rem)' color='primary'>
        Media
      </Typography>
    </FlexRow>
  )
}

export default Logo
