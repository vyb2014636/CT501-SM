import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { forgotPasswordAPI, resetPasswordAPI, verifyResetOTP } from '@/apis/auth/authAPI'

const ForgotPassword = () => {
  const navigate = useNavigate()
  // Đọc lại trạng thái từ localStorage nếu có
  const storedStep = localStorage.getItem('step')
  const storedEmail = localStorage.getItem('email')
  const storedResetToken = localStorage.getItem('resetToken')

  const [step, setStep] = useState(storedStep ? parseInt(storedStep) : 0)
  const [email, setEmail] = useState(storedEmail || '')
  const [resetToken, setResetToken] = useState(storedResetToken || '')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  // Lưu lại trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('step', step)
    localStorage.setItem('email', email)
    localStorage.setItem('resetToken', resetToken)
  }, [step, email, resetToken])

  // Dọn dẹp localStorage khi component bị unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem('step')
      localStorage.removeItem('email')
      localStorage.removeItem('resetToken')
    }
  }, [])

  const onSubmitEmail = async (data) => {
    setLoading(true)
    setDisabled(true)
    setEmail(data.email)
    try {
      const response = await forgotPasswordAPI(data.email)
      toast.success(response.message)
      setStep(1) // Chuyển sang bước 2
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  // Kiểm tra mã OTP
  const onSubmitOtp = async (data) => {
    setLoading(true)
    setDisabled(true)
    try {
      const response = await verifyResetOTP(email, data.otp)
      toast.success(response.message)
      setResetToken(response.OTP)
      setStep(2)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  // Gửi lại mã OTP khi hết hạn
  const resendOtp = async () => {
    setLoading(true)
    setDisabled(true)
    try {
      const response = await forgotPasswordAPI(email)
      toast.success('Đã gửi lại mã OTP!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  // Cập nhật mật khẩu mới
  const onSubmitNewPassword = async (data) => {
    setLoading(true)
    setDisabled(true)
    try {
      const response = await resetPasswordAPI(email, resetToken, data.password)
      toast.success(response.message)
      // setStep(0)
      // setEmail('')
      // setResetToken('')
      // setStep(0)
      // localStorage.removeItem('step')
      // localStorage.removeItem('email')
      // localStorage.removeItem('resetToken')
      navigate('/auth/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  return (
    <FlexColumn sx={{ margin: '0 auto', p: 4 }} bgcolor='background.paper' borderRadius={4}>
      <Typography variant='h5' gutterBottom align='center'>
        Quên mật khẩu?
      </Typography>

      <Stepper activeStep={step} alternativeLabel>
        <Step>
          <StepLabel>Email</StepLabel>
        </Step>
        <Step>
          <StepLabel>OTP</StepLabel>
        </Step>
        <Step>
          <StepLabel>Mật khẩu mới</StepLabel>
        </Step>
      </Stepper>

      {step === 0 && (
        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            margin='normal'
            {...register('email', {
              required: 'Email là bắt buộc',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Email không hợp lệ'
              }
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button type='submit' fullWidth variant='contained' disabled={disabled || loading}>
              {loading ? 'Đang gửi yêu cầu...' : 'Gửi mã OTP'}
            </Button>
          </Box>
        </form>
      )}

      {/* Bước 2: Nhập mã OTP */}
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitOtp)}>
          <TextField
            fullWidth
            label='Mã OTP'
            variant='outlined'
            margin='normal'
            {...register('otp', {
              required: 'Mã OTP là bắt buộc'
            })}
            error={Boolean(errors.otp)}
            helperText={errors.otp?.message}
          />
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button type='submit' fullWidth variant='contained' disabled={disabled || loading}>
              {loading ? 'Đang xác minh...' : 'Xác minh OTP'}
            </Button>
          </Box>
          <Button fullWidth variant='outlined' onClick={resendOtp} disabled={loading || disabled} sx={{ mt: 2 }}>
            Gửi lại mã OTP
          </Button>
        </form>
      )}

      {/* Bước 3: Nhập mật khẩu mới */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitNewPassword)}>
          <TextField
            fullWidth
            label='Mật khẩu mới'
            variant='outlined'
            margin='normal'
            type='password'
            {...register('password', {
              required: 'Mật khẩu là bắt buộc',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự'
              }
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            label='Xác nhận mật khẩu mới'
            variant='outlined'
            margin='normal'
            type='password'
            {...register('confirmPassword', {
              required: 'Xác nhận mật khẩu là bắt buộc',
              validate: (value) => value === getValues('password') || 'Mật khẩu không khớp'
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button type='submit' fullWidth variant='contained' disabled={disabled || loading}>
              {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
            </Button>
          </Box>
        </form>
      )}

      <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
        Quay lại <Link to='/auth'>Đăng nhập</Link>
      </Typography>
    </FlexColumn>
  )
}

export default ForgotPassword
