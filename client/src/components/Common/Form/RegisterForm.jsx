import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { setValues } from '@/utils/helpers'
import { CircularProgress } from '@mui/material'
import { registerAPI } from '@/apis/auth/authAPI'
import { firstnameValidation, lastnameValidation, emailValidation, passwordValidation, confirmPasswordValidation } from '@/utils/validationRules'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    mode: 'onChange', // Check form validity on every change
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data) => {
    const { confirmPassword, ...dataWithoutConfirmPassword } = data
    setValues([setLoading, true], [setDisabled, true])
    try {
      const response = await registerAPI(dataWithoutConfirmPassword) // Gọi API với data không có confirmPassword
      const email = response.newUser.email
      setValues([setLoading, false], [setDisabled, false])
      toast.success(`${response.message}`)
      navigate('/auth/verify', { state: { email } })
    } catch (error) {
      toast.error(`${error.message}`)
      setValues([setLoading, false], [setDisabled, false])
    }
  }

  // useEffect(() => {
  //   setDisabled(!isValid) // Disable submit button if form is not valid
  // }, [isValid])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexRow gap={2} width={1}>
        <Controller
          name='firstname'
          control={control}
          rules={firstnameValidation}
          render={({ field }) => (
            <TextField {...field} margin='normal' label='Họ' error={Boolean(errors.firstname)} helperText={errors.firstname?.message} fullWidth />
          )}
        />
        <Controller
          name='lastname'
          control={control}
          rules={lastnameValidation}
          render={({ field }) => (
            <TextField {...field} margin='normal' label='Tên' error={Boolean(errors.lastname)} helperText={errors.lastname?.message} fullWidth />
          )}
        />
      </FlexRow>
      <Controller
        name='email'
        control={control}
        rules={emailValidation}
        render={({ field }) => (
          <TextField {...field} fullWidth margin='normal' label='Email' error={Boolean(errors.email)} helperText={errors.email?.message} />
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={passwordValidation}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin='normal'
            label='Mật khẩu'
            type='password'
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        rules={confirmPasswordValidation(watch, 'password')}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin='normal'
            label='Xác nhận mật khẩu'
            type='password'
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />

      <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
        Bạn đã có tài khoản? <Link to='/auth'>Đăng nhập</Link>
      </Typography>

      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            mt: 3,
            background: isValid && !loading ? 'linear-gradient(to right, #673ab7, #2196f3)' : undefined
          }}
          startIcon={loading ? <CircularProgress size={24} /> : ''}
          disabled={!isValid || loading}>
          Đăng ký
        </Button>
      </Box>
    </form>
  )
}

export default RegisterForm
