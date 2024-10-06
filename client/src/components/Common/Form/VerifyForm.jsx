import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyEmailAPI } from '@/apis/auth/authAPI'
import { toast } from 'react-toastify'
import { setFalse, setValues } from '@/utils/helpers'

const VerifyForm = ({ email, timeExpired, setTimeExpired }) => {
  const [codes, setCodes] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const newValues = [...codes]
    newValues[index] = e.target.value.slice(-1)
    setCodes(newValues)

    if (e.target.value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus()
    }
  }

  const handleKeyDownBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !codes[index]) {
      document.getElementById(`input-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const codeString = codes.join('')
    console.log(email)
    setValues([setLoading, true], [setDisabled, true])
    const setTimeoutLoading = setTimeout(async () => {
      try {
        const response = await verifyEmailAPI(email, codeString)
        toast.success(`${response.message}`)
        setValues([setLoading, false], [setDisabled, true])
        navigate('/auth')
      } catch (error) {
        toast.error(`${error.message}`)
        setFalse(setDisabled, setLoading)
      }
    }, 1000)
    return () => {
      clearTimeout(setTimeoutLoading)
    }
  }

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(codes).some((value) => value === '')

    setDisabled(isAnyFieldEmpty)
  }, [codes])

  useEffect(() => {
    if (timeExpired > 0) {
      const timer = setInterval(() => {
        setTimeExpired(timeExpired - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      Swal.fire({
        title: 'Hết thời gian xác thực',
        text: 'Bạn đã quá thời gian để nhập mã xác thực. Vui lòng đăng ký lại.',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/auth/signup') // Chuyển đến trang đăng ký sau khi người dùng nhấn OK
      })
    }
  }, [timeExpired, navigate])

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' justifyContent='center' gap={1} p={3}>
        {codes.map((value, index) => (
          <TextField
            key={index}
            id={`input-${index}`}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDownBackspace(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '12px', width: '24px', height: '24px' }
            }}
          />
        ))}
      </Box>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 3,
          background: !disabled && 'linear-gradient(to right, #673ab7, #2196f3)'
        }}
        startIcon={loading ? <CircularProgress size={24} /> : ''}
        disabled={disabled || loading}>
        Gửi
      </Button>
    </form>
  )
}

export default VerifyForm
