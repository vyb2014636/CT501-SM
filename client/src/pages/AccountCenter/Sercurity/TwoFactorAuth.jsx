import React, { useState } from 'react'
import { Box, Button, TextField, Typography, CircularProgress, FormControlLabel, Switch } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper' // Import ModalWrapper
import { enable2FAAPI, verifyEnable2FAAPI, disable2FAAPI } from '@/apis/auth/authAPI'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updated2FA } from '@/features/auth/authSlice'

const TwoFactorAuth = ({ is2FAEnabled = false, onToggle2FA = () => {}, email }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const token = watch('token')

  const handle2FASwitch = async (event) => {
    const checked = event.target.checked

    if (checked) {
      setIsLoading(true)
      try {
        const response = await enable2FAAPI(email)
        setQrCode(response.qrCode)
        setSecret(response.secret)
        setFormVisible(true)
        setOpenModal(true)
      } catch (error) {
        console.error('Error enabling 2FA:', error.message)
        toast.error('Lỗi khi bật xác thực 2FA')
      }
      setIsLoading(false)
    } else {
      // Khi tắt 2FA
      setIsLoading(true)
      try {
        const response = await disable2FAAPI()
        dispatch(updated2FA(response.is2FAEnabled))
        onToggle2FA(false)
        toast.success(response.message)
      } catch (error) {
        console.error('Error disabling 2FA:', error.message)
        toast.error('Lỗi khi tắt xác thực 2FA')
      }
      setIsLoading(false)
    }
  }

  const handleSubmitToken = async (data) => {
    try {
      const token = data.token
      const response = await verifyEnable2FAAPI(email, token)
      onToggle2FA(true)
      setOpenModal(false)
      dispatch(updated2FA(response.is2FAEnabled))
      toast.success('Bật thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box py={3}>
      <FormControlLabel
        control={<Switch checked={is2FAEnabled} onChange={handle2FASwitch} />}
        label={is2FAEnabled ? 'Đã bật' : 'Chưa bật'}
        labelPlacement='start'
      />

      {/* Modal chứa form nhập mã OTP khi 2FA được bật */}
      <ModalWrapper open={openModal} onClose={() => setOpenModal(false)} title='Xác thực 2 bước'>
        <Box sx={{ mt: 2, p: 2 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={qrCode} alt='QR Code' />
              </Box>

              <Typography variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
                Quét mã QR bằng ứng dụng xác thực của bạn (Google Authenticator, Authy, v.v.) và nhập mã OTP bên dưới:
              </Typography>

              <form onSubmit={handleSubmit(handleSubmitToken)}>
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
                      helperText={errors.token ? 'Mã phải là 6 chữ số' : ''}
                      inputProps={{
                        maxLength: 6, // Giới hạn tối đa 6 ký tự
                        inputMode: 'numeric', // Chỉ cho phép nhập số
                        pattern: '[0-9]*' // Chỉ cho phép số
                      }}
                    />
                  )}
                />

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    type='submit'
                    disabled={token?.length !== 6} // Disable nếu mã OTP không đủ 6 ký tự
                  >
                    Xác nhận
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Box>
      </ModalWrapper>
    </Box>
  )
}

export default TwoFactorAuth
