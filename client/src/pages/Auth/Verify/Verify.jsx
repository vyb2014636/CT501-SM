import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import FlexCenter from '@/components/Flex/FlexCenter'
import LeftSection from '@/components/Form/LeftSection'
import { verifyEmailAPI } from '@/apis/auth/authAPI'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatTime, setFalse, setValues } from '@/utils/helpers'
import Swal from 'sweetalert2'

const Verify = () => {
  const [codes, setCodes] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [timeExpired, setTimeExpired] = useState(60)

  const location = useLocation()
  const navigate = useNavigate()
  const { email } = location.state || {}

  const handleChange = (e, index) => {
    const newValues = [...codes]
    newValues[index] = e.target.value.slice(-1) // Chỉ lấy ký tự cuối cùng (tránh nhập nhiều ký tự)
    setCodes(newValues)

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
    if (e.target.value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus()
    }
  }

  const handleKeyDownBackspace = (e, index) => {
    // Xử lý phím backspace để di chuyển về ô trước đó
    if (e.key === 'Backspace' && index > 0 && !values[index]) {
      document.getElementById(`input-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const codeString = codes.join('')
    setValues([setLoading, true], [setDisabled, true])
    const setTimeoutLoading = setTimeout(() => {
      verifyEmailAPI(email, codeString).then((response) => {
        if (response?.success) {
          toast.success(`${response.message}`)
          setValues([setLoading, false], [setDisabled, true])
          navigate('/auth')
        } else {
          toast.error(`${response.message}`)
          setFalse(setDisabled, setLoading)
        }
      })
    }, 1000)
    return () => {
      clearTimeout(setTimeoutLoading)
    }
  }

  useEffect(() => {
    // Validate all fields and determine if the submit button should be disabled
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
    <FlexCenter
      sx={{
        height: '50%',
        padding: 2,
        m: 'auto'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          backgroundColor: 'background.default',
          borderRadius: '16px',
          maxWidth: '900px',
          overflow: 'hidden'
        }}>
        <LeftSection />
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: { xs: 3, md: 4 },
            bgcolor: 'background.paper',
            borderRadius: '12px'
          }}>
          <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2} color='primary'>
            Xác thực tài khoản
          </Typography>
          <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
            Để hoàn tất cho quá trình đăng ký, bạn cần xác thực tài khoản .
          </Typography>
          <Typography variant='body2' color='textSecondary' textAlign='center' mt={2} align='center'>
            Chúng tôi đã gửi mã xác thực qua email của bạn mã xác thực sẽ tồn tại trong :{formatTime(timeExpired)}
          </Typography>
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
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default Verify
