import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styleForm } from '@/styles/styleAuth/style'
import RegisterForm from '@/components/Common/Form/RegisterForm'

const Register = () => {
  return (
    <Box sx={styleForm}>
      <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2} color='primary'>
        Đăng ký
      </Typography>

      <RegisterForm />
    </Box>
  )
}

export default Register
