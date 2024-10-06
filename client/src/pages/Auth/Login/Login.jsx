import React from 'react'
import { Box, Typography } from '@mui/material'
import { styleForm } from '@/styles/styleAuth/style'
import LoginForm from '@/components/Common/Form/LoginForm'

const Login = () => {
  return (
    <Box sx={styleForm}>
      <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2} color='primary'>
        Đăng nhập
      </Typography>

      <LoginForm />
    </Box>
  )
}

export default Login
