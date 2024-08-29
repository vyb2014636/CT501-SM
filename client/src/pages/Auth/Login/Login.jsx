import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import FlexCenter from '@/components/Flex/FlexCenter'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginPost } from '@/features/auth/authThunk'
import LeftSection from '@/components/Form/LeftSection'
import { toast } from 'react-toastify'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(loginPost(credentials))
    if (response.payload?.statusCode === 500) toast.error(response.payload?.message)
    else {
      navigate('/')
      toast.success('Đăng nhập thành công')
    }
  }
  useEffect(() => {
    if (credentials.email && credentials.password) setDisabled(false)
    else setDisabled(true)
  }, [credentials])

  // if (user) return <Navigate to='/' />

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
        <LeftSection />

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
              label='Email'
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
              sx={{
                mt: 3,
                background: !disabled ? 'linear-gradient(to right, #673ab7, #2196f3)' : undefined
              }}
              // disabled={status === 'loading'}
              disabled={disabled}>
              Đăng nhập
            </Button>
          </form>
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default Login
