import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { login } from '@/features/auth/authThunk'
import { toast } from 'react-toastify'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { fetchChats } from '@/features/chat/chatThunk'
import { fetchUsersOnline } from '@/apis/auth/authAPI'
import { setOnlineUsers } from '@/features/online/onlineSlice'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(credentials))
      .unwrap()
      .then(async () => {
        const response = await fetchUsersOnline()
        dispatch(fetchListNotificationAPI({ page: 1 }))
        dispatch(setOnlineUsers(response.users))
        dispatch(fetchChats())
        toast.success('Đăng nhập thành công')
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
  )
}

export default LoginForm
