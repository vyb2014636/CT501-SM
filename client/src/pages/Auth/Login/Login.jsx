import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/features/auth/authThunk'
import { toast } from 'react-toastify'
import { styleForm } from '@/styles/styleAuth/style'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [disabled, setDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        toast.success('Đăng nhập thành công')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message || 'Đăng nhập thất bại')
      })
  }
  useEffect(() => {
    if (credentials.email && credentials.password) setDisabled(false)
    else setDisabled(true)
  }, [credentials])

  return (
    <Box sx={styleForm}>
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
          sx={{ mt: 3, background: !disabled ? 'linear-gradient(to right, #673ab7, #2196f3)' : undefined }}
          disabled={disabled}>
          Đăng nhập
        </Button>
      </form>
    </Box>
  )
}

export default Login
