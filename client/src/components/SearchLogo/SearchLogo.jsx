import React from 'react'
import FlexBetween from '@/components/Flex/FlexBetween'
import { ReactComponent as socialIcon } from '@/assets/logoIcon.svg'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded'
import { useMediaQuery } from '@mui/material'
import MenuMobile from '../Menu/MenuMobile'
import { useNavigate } from 'react-router-dom'

const SearchLogo = () => {
  const navigate = useNavigate()
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <FlexBetween sx={{ gap: 2, p: 2, borderRadius: '12px' }}>
      <FlexBetween onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
        <SvgIcon component={socialIcon} inheritViewBox fontSize='large' color='secondary' />
        <Typography fontWeight='bold' fontSize='clamp(1rem,1.7rem,2.25rem)' color='secondary'>
          Media
        </Typography>
      </FlexBetween>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Tìm kiếm'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
              <IconButton size='small'>
                <PageviewRoundedIcon fontSize='large' color='secondary' />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '12px'
          }
        }}
      />
      {!isNonScreenMobile && <MenuMobile />}
    </FlexBetween>
  )
}

export default SearchLogo
