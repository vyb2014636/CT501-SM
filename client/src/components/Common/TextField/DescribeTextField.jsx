import React from 'react'
import { scrollbarTextFieldStyleMui } from '@/styles/styles'
import { TextField } from '@mui/material'

const DescribeTextField = ({ placeholder, content, setContent }) => {
  return (
    <TextField
      placeholder={placeholder}
      variant='standard'
      fullWidth
      multiline
      rows={4}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      InputProps={{
        disableUnderline: true,
        sx: scrollbarTextFieldStyleMui
      }}
    />
  )
}

export default DescribeTextField
