import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/features/auth/authThunk'
import { toast } from 'react-toastify'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { fetchChats } from '@/features/chat/chatThunk'
import { fetchUsersOnline } from '@/apis/auth/authAPI'
import { setOnlineUsers } from '@/features/online/onlineSlice'
import ModalWrapper from '../Modal/ModalWrapper'
import Verify2FA from '@/pages/Auth/Login/Verify2FA/Verify2FA'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [user2FA, setUser2FA] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleOpen2FA = (user2FA) => {
    setIs2FAEnabled(true)
    setUser2FA(user2FA)
  }
  const handleClose2FA = () => {
    setIs2FAEnabled(false)
    setUser2FA(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(openBackdrop())

    try {
      const res = await dispatch(login(credentials)).unwrap()

      if (!res.user.is2FAEnabled) {
        const response = await fetchUsersOnline()
        dispatch(setOnlineUsers(response.users))
        dispatch(fetchListNotificationAPI({ page: 1 }))
        dispatch(fetchChats())
        toast.success('Đăng nhập thành công')
      } else {
        handleOpen2FA(res.user)
      }
    } catch (error) {
      toast.error(error.message || 'Đăng nhập thất bại')
    } finally {
      dispatch(closeBackdrop())
    }
  }

  useEffect(() => {
    if (credentials.email && credentials.password) setDisabled(false)
    else setDisabled(true)
  }, [credentials])

  return (
    <>
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
      <ModalWrapper open={is2FAEnabled} onClose={handleClose2FA} title='Xác thực 2FA'>
        <Verify2FA user={user2FA} setIs2FAEnabled={setIs2FAEnabled} />
      </ModalWrapper>
    </>
  )
}

export default LoginForm
