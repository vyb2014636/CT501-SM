import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const LoginForm = ({ handleSubmit, credentials, setCredentials, disabled }) => {
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
