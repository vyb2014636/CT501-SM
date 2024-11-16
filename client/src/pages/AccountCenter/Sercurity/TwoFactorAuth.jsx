import React, { useState } from 'react'
import { Box, Button, TextField, Typography, CircularProgress, FormControlLabel, Switch } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper' // Import ModalWrapper
import { enable2FAAPI, verifyEnable2FAAPI, disable2FAAPI } from '@/apis/auth/authAPI'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updated2FA } from '@/features/auth/authSlice'
import { passwordValidation } from '@/utils/validationRules'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const TwoFactorAuth = ({ is2FAEnabled = false, onToggle2FA = () => {}, email }) => {
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [isEnabling2FA, setIsEnabling2FA] = useState(false) // Theo dõi trạng thái bật hay tắt 2FA
  const [openOtpModal, setOpenOtpModal] = useState(false)
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm({
    defaultValues: {
      token: '',
      password: ''
    }
  })

  const token = watch('token')

  const handleSwitchChange = (event) => {
    const checked = event.target.checked
    setIsEnabling2FA(checked) // Theo dõi hành động bật/tắt
    setOpenPasswordModal(true) // Mở modal yêu cầu nhập mật khẩu
  }

  const handlePasswordSubmit = async (data) => {
    const { password } = data
    dispatch(openBackdrop())

    if (password.trim('') !== '') {
      try {
        if (isEnabling2FA) {
          // Bật 2FA
          const response = await enable2FAAPI(email, password)
          setQrCode(response.qrCode)
          setSecret(response.secret)
          setOpenOtpModal(true)
          toast.success('Mật khẩu hợp lệ! Vui lòng quét mã QR để tiếp tục.')
        } else {
          const response = await disable2FAAPI(password)
          dispatch(updated2FA(response.is2FAEnabled))
          onToggle2FA(false)
          toast.success('Đã tắt chế độ xác thưc 2FA')
        }
        setOpenPasswordModal(false)
        reset({ password: '' })
      } catch (error) {
        toast.error('Mật khẩu không chính xác. Vui lòng thử lại!')
      } finally {
        dispatch(closeBackdrop())
      }
    } else {
      toast.error('Vui lòng nhập mật khẩu!')
      dispatch(closeBackdrop())
    }
  }

  const handleOtpSubmit = async (data) => {
    const { token } = data
    dispatch(openBackdrop())

    try {
      const response = await verifyEnable2FAAPI(email, token)
      dispatch(updated2FA(response.is2FAEnabled))
      onToggle2FA(true)
      setOpenOtpModal(false)
      toast.success('Xác thực 2FA thành công!')
    } catch (error) {
      toast.error('Mã OTP không hợp lệ. Vui lòng thử lại!')
    } finally {
      dispatch(closeBackdrop())
    }
  }

  return (
    <Box py={3}>
      <FormControlLabel
        control={<Switch checked={is2FAEnabled} onChange={handleSwitchChange} />}
        label={is2FAEnabled ? 'Đã bật' : 'Chưa bật'}
        labelPlacement='start'
      />

      {/* Modal nhập mật khẩu */}
      <ModalWrapper
        open={openPasswordModal}
        onClose={() => {
          reset({ password: '' })
          setOpenPasswordModal(false)
        }}
        title='Xác nhận mật khẩu'>
        <Box p={2}>
          <form onSubmit={handleSubmit(handlePasswordSubmit)}>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Mật khẩu'
                  type='password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Box sx={{ mt: 2 }}>
              <Button variant='contained' color='primary' fullWidth type='submit'>
                Xác nhận
              </Button>
            </Box>
          </form>
        </Box>
      </ModalWrapper>

      {/* Modal nhập OTP */}
      <ModalWrapper open={openOtpModal} onClose={() => setOpenOtpModal(false)} title='Xác thực 2 bước'>
        <Box sx={{ mt: 2, p: 2 }}>
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={qrCode} alt='QR Code' />
            </Box>

            <Typography variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
              Quét mã QR bằng ứng dụng xác thực của bạn (Google Authenticator, Authy, v.v.) và nhập mã OTP bên dưới:
            </Typography>

            <form onSubmit={handleSubmit(handleOtpSubmit)}>
              <Controller
                name='token'
                control={control}
                rules={{ required: 'Mã xác thực là bắt buộc', pattern: /^[0-9]{6}$/ }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Mã xác thực'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    error={!!errors.token}
                    helperText={errors.token ? 'Mã phải là 6 số' : ''}
                    inputProps={{
                      maxLength: 6,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                  />
                )}
              />

              <Box sx={{ mt: 2 }}>
                <Button variant='contained' color='primary' fullWidth type='submit' disabled={!isValid}>
                  Xác nhận
                </Button>
              </Box>
            </form>
          </>
        </Box>
      </ModalWrapper>
    </Box>
  )
}

export default TwoFactorAuth
