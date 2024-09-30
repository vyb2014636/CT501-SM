import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/features/auth/authThunk'
import { toast } from 'react-toastify'
import { styleForm } from '@/styles/styleAuth/style'
import LoginForm from '@/components/user/Form/LoginForm'

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

      <LoginForm handleSubmit={handleSubmit} credentials={credentials} setCredentials={setCredentials} disabled={disabled} />
    </Box>
  )
}

export default Login
