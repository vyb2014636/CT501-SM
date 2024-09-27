import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { validateField } from '@/utils/validation'
import { toast } from 'react-toastify'
import { setFalse, setValues } from '@/utils/helpers'
import { registerAPI } from '@/apis/auth/authAPI'
import { styleForm } from '@/styles/styleAuth/style'

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
    try {
      const response = await registerAPI(user)
      const email = response.newUser.email
      setValues([setLoading, false], [setDisabled, true])
      toast.success(`${response.message}`)
      navigate('/auth/verify', { state: { email } })
    } catch (error) {
      const setTimeoutLoading = setTimeout(() => {
        toast.error(`${error.message}`)
        setFalse(setDisabled, setLoading)
      }, 1000)
      return () => {
        clearTimeout(setTimeoutLoading)
      }
    }
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== '')
    const isAnyFieldEmpty = Object.values(credentials).some((value) => value === '')

    setDisabled(hasErrors || isAnyFieldEmpty)
  }, [credentials, errors])

  return (
    <Box sx={styleForm}>
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
  )
}

export default SignUp
