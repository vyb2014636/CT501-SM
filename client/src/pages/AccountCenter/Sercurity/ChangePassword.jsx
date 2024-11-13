// src/components/Security/ChangePassword.js
import React, { useState } from 'react'
import { Box, TextField, Button, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm, Controller } from 'react-hook-form'
import { nameValidation, addressValidation, passwordValidation, confirmPasswordValidation, newPasswordValidation } from '@/utils/validationRules'
import { useDispatch } from 'react-redux'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import { toast } from 'react-toastify'
import { changePasswordAPI } from '@/apis/auth/authAPI'
import { updateUser } from '@/features/auth/authSlice'

const ChangePassword = ({ onClose }) => {
  const dispatch = useDispatch()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    watch,
    getValues
  } = useForm({
    mode: 'onChange', // Chế độ kiểm tra khi thay đổi
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = getValues()
    const { currentPassword, newPassword } = formData
    try {
      dispatch(openBackdrop())
      const response = await changePasswordAPI(currentPassword, newPassword)
      dispatch(updateUser(response.user))
      toast.success('Bạn đã thay đổi mật khẩu thành công')
      onClose()
    } catch (error) {
      toast.error(error.message)
    }
    dispatch(closeBackdrop())
  }

  return (
    <Box p={3}>
      <form onSubmit={handleFormSubmit}>
        {/* Mật khẩu cũ */}
        <Controller
          name='currentPassword'
          control={control}
          rules={passwordValidation}
          render={({ field }) => (
            <Box position='relative'>
              <TextField
                {...field}
                label='Mật khẩu cũ'
                variant='outlined'
                fullWidth
                type={showCurrentPassword ? 'text' : 'password'}
                margin='normal'
                error={!!errors.currentPassword}
                helperText={errors.currentPassword ? errors.currentPassword.message : ''}
                onFocus={() => clearErrors('currentPassword')}
              />
              <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
        />

        {/* Mật khẩu mới */}
        <Controller
          name='newPassword'
          control={control}
          rules={newPasswordValidation(watch)}
          render={({ field }) => (
            <Box position='relative'>
              <TextField
                {...field}
                label='Mật khẩu mới'
                variant='outlined'
                fullWidth
                type={showNewPassword ? 'text' : 'password'}
                margin='normal'
                error={!!errors.newPassword}
                helperText={errors.newPassword ? errors.newPassword.message : ''}
                onFocus={() => clearErrors('newPassword')}
              />
              <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
        />

        {/* Xác nhận mật khẩu mới */}
        <Controller
          name='confirmNewPassword'
          control={control}
          rules={confirmPasswordValidation(watch, 'newPassword')}
          render={({ field }) => (
            <Box position='relative'>
              <TextField
                {...field}
                label='Xác nhận mật khẩu mới'
                variant='outlined'
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                margin='normal'
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ''}
                onFocus={() => clearErrors('confirmNewPassword')}
              />
              <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
        />

        {/* Nút xác nhận */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            disabled={!isValid} // Vô hiệu hóa nếu form không hợp lệ
          >
            Xác nhận
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ChangePassword
