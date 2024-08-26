import React, { useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import FlexCenter from '@/components/Flex/FlexCenter'
import Logo from '@components/Logo/Logo'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginPost } from '@/features/auth/authThunk'
import { logout } from '@/features/auth/authSlice'
// import axios from 'axios'
// import { ReactComponent as socialIcon } from '@/assets/logoIcon.svg'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { user, status, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginPost(credentials))
    if (!error) alert(result.payload.message)
  }

  if (user) return <Navigate to='/' />

  return (
    <FlexCenter
      sx={{
        height: '50%',
        padding: 2,
        m: 'auto'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: '16px',
          maxWidth: '900px',
          overflow: 'hidden'
        }}>
        {/* Left Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
            padding: { xs: 3, md: 4 },
            width: { xs: '100%', md: '50%' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
          {/* <img src='/twitter-logo.png' alt='Logo' width='60' /> */}

          <Logo />
          <Typography color='textSecondary' mt={1}>
            Khám phá những ý tưởng trên khắp thế giới.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: { xs: 3, md: 4 },
            bgcolor: 'background.paper',
            borderRadius: '12px'
          }}>
          <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2} color='primary'>
            Đăng nhập
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin='normal'
              label='Tên đăng nhập'
              variant='outlined'
              value={credentials?.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Mật khẩu'
              variant='outlined'
              type='password'
              value={credentials?.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />

            <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
              Bạn chưa có tài khoản? <Link to='/auth/signup'>Đăng ký</Link>
            </Typography>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, background: 'linear-gradient(to right, #673ab7, #2196f3)' }}
              disabled={status === 'loading'}>
              Đăng nhập
            </Button>
          </form>
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default Login
