import { Typography } from '@mui/material'
import React from 'react'

const TitleModal = ({ title }) => {
  return (
    <Typography align='center' fontWeight={900} variant='h6' my={2} padding={0}>
      {title}
    </Typography>
  )
}

export default TitleModal
