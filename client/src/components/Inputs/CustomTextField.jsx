import React from 'react'
import TextField from '@mui/material/TextField'

const CustomTextField = ({ label, name, value, onChange, error, helperText }) => {
  return (
    <TextField margin='normal' label={label} name={name} value={value} onChange={onChange} error={Boolean(error)} helperText={helperText} fullWidth />
  )
}

export default CustomTextField
