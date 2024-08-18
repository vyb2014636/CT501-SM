import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import FlexCenter from '@/components/Flex/FlexCenter'
import { ReactComponent as socialIcon } from '@/assets/logoIcon.svg'
import Logo from '@components/Logo/Logo'
import { Link } from 'react-router-dom'
import FlexRow from '@/components/Flex/FlexRow'
// import axios from 'axios'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }

    // try {
    //   const response = await axios.post('/api/signup', formData)
    //   console.log(response.data)
    // } catch (error) {
    //   console.error('Error signing up:', error)
    // }
  }

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
          backgroundColor: 'background.default',
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
            Đăng ký
          </Typography>

          <form onSubmit={handleSubmit}>
            <FlexRow gap={2}>
              <TextField margin='normal' label='Họ' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <TextField margin='normal' label='Tên' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FlexRow>
            <TextField
              fullWidth
              margin='normal'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Mật khẩu'
              variant='outlined'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Xác nhận mật khẩu'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
              Bạn đã có tài khoản? <Link to='/auth'>Đăng nhập</Link>
            </Typography>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, background: 'linear-gradient(to right, #673ab7, #2196f3)' }}>
              Đăng ký
            </Button>
          </form>
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default SignUp
