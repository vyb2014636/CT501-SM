import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
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
import { emailValidation, passwordValidation } from '@/utils/validationRules'

const LoginForm = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [user2FA, setUser2FA] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }, // Lấy thông tin lỗi và kiểm tra tính hợp lệ
    watch,
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange' // Đảm bảo lỗi được kiểm tra khi giá trị thay đổi
  })

  const email = watch('email')
  const password = watch('password')

  const handleOpen2FA = (user2FA) => {
    setIs2FAEnabled(true)
    setUser2FA(user2FA)
  }

  const handleClose2FA = () => {
    setIs2FAEnabled(false)
    setUser2FA(null)
  }

  const onSubmit = async (data) => {
    dispatch(openBackdrop())
    try {
      const res = await dispatch(login(data)).unwrap()

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={control}
          rules={emailValidation} // Áp dụng validation email
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin='normal'
              label='Email'
              variant='outlined'
              error={!!errors.email} // Hiển thị lỗi nếu có
              helperText={errors.email?.message} // Hiển thị thông báo lỗi nếu có
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          rules={passwordValidation} // Áp dụng validation password
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin='normal'
              label='Mật khẩu'
              variant='outlined'
              type='password'
              error={!!errors.password} // Hiển thị lỗi nếu có
              helperText={errors.password?.message} // Hiển thị thông báo lỗi nếu có
            />
          )}
        />

        <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
          Bạn chưa có tài khoản? <Link to='/auth/signup'>Đăng ký</Link>
        </Typography>
        <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
          <Link to='/auth/forgotPassword'>Quên mật khẩu</Link>
        </Typography>

        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            mt: 3,
            background: isValid ? 'linear-gradient(to right, #673ab7, #2196f3)' : 'gray' // Khi hợp lệ mới hiển thị màu nút
          }}
          disabled={!isValid}>
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
