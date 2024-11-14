import React, { useEffect, useState } from 'react'
import { Button, TextField, Box, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import { loginWith2FA } from '@/features/auth/authThunk'
import { fetchUsersOnline } from '@/apis/auth/authAPI'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { setOnlineUsers } from '@/features/online/onlineSlice'
import { fetchChats } from '@/features/chat/chatThunk'
import { useDispatch } from 'react-redux'

const Verify2FA = ({ user, setIs2FAEnabled }) => {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [countdown, setCountdown] = useState(30)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  if (!user) return <NotFoundPage />

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    if (countdown <= 0) {
      toast.error('Mã OTP đã hết hạn. Vui lòng thử lại.')
      setIs2FAEnabled(false)
    }

    return () => clearInterval(timer)
  }, [countdown, setIs2FAEnabled])

  const handleChange = (e, index) => {
    const newValues = [...otp]
    newValues[index] = e.target.value.slice(-1)
    setOtp(newValues)

    if (e.target.value && index < 5) {
      document.getElementById(`input-2fa-${index + 1}`).focus()
    }
  }

  const handleKeyDownBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      document.getElementById(`input-2fa-${index - 1}`).focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('Text')

    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(''))
      document.getElementById(`input-2fa-${5}`).focus()
    } else {
      toast.error('Mã OTP không hợp lệ')
    }
  }

  const handleLoginWith2FA = async (e) => {
    e.preventDefault()
    const token = otp.join('')
    dispatch(loginWith2FA({ email: user?.email, token }))
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
  return (
    <form onSubmit={handleLoginWith2FA} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: 4 }}>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        Nhập mã OTP từ ứng dụng xác thực để tiếp tục.
      </Typography>
      <Typography variant='body1' color='error' gutterBottom>
        {`Thời gian còn lại: ${countdown}s`}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        {otp.map((value, index) => (
          <TextField
            key={index}
            id={`input-2fa-${index}`}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDownBackspace(e, index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '12px', width: '24px', height: '24px' },
              autoFocus: index === 0 ? true : false,
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
        ))}
      </Box>

      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={loading}
        sx={{
          mt: 2,
          background: loading ? undefined : 'linear-gradient(to right, #673ab7, #2196f3)'
        }}>
        xác thực
      </Button>
    </form>
  )
}

export default Verify2FA
