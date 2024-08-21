import React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded'

const Search = () => {
  return (
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
  )
}

export default Search
