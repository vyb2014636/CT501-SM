import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import FlexCenter from '@/components/Flex/FlexCenter'
import FlexRow from '@/components/Flex/FlexRow'
import LeftSection from '@/components/Form/LeftSection'
import { validateField } from '@/utils/validation'
import { registerAPI } from '@/apis/authAPI'
import { toast } from 'react-toastify'
import { setFalse, setValues } from '@/utils/helpers'

const SignUp = () => {
  const [credentials, setCredentials] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' })
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })

    // Validation form
    const error = validateField(name, value, credentials)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...user } = credentials
    setValues([setLoading, true], [setDisabled, true])
    registerAPI(user).then((response) => {
      if (response?.success) {
        const email = response.newUser.email
        setValues([setLoading, false], [setDisabled, true])
        navigate('/auth/verify', { state: { email } })
      } else {
        const setTimeoutLoading = setTimeout(() => {
          toast.error(`${response.message}`)
          setFalse(setDisabled, setLoading)
        }, 2000)
        return () => {
          clearTimeout(setTimeoutLoading)
        }
      }
    })
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== '')
    const isAnyFieldEmpty = Object.values(credentials).some((value) => value === '')

    setDisabled(hasErrors || isAnyFieldEmpty)
  }, [credentials, errors])

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
        <LeftSection />
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
              <TextField
                margin='normal'
                label='Họ'
                name='firstname'
                value={credentials.firstname}
                onChange={handleChangeInput}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
              />
              <TextField
                margin='normal'
                label='Tên'
                name='lastname'
                value={credentials.lastname}
                onChange={handleChangeInput}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
              />
            </FlexRow>
            <TextField
              fullWidth
              margin='normal'
              label='Email'
              name='email'
              value={credentials.email}
              onChange={handleChangeInput}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Mật khẩu'
              variant='outlined'
              name='password'
              type='password'
              value={credentials.password}
              onChange={handleChangeInput}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Xác nhận mật khẩu'
              name='confirmPassword'
              type='password'
              value={credentials.confirmPassword}
              onChange={handleChangeInput}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />

            <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
              Bạn đã có tài khoản? <Link to='/auth'>Đăng nhập</Link>
            </Typography>

            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  background: !disabled ? 'linear-gradient(to right, #673ab7, #2196f3)' : undefined
                }}
                startIcon={loading ? <CircularProgress size={24} /> : ''}
                disabled={disabled || loading}>
                Đăng ký
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default SignUp
