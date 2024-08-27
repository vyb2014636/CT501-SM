import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import FlexCenter from '@/components/Flex/FlexCenter'
import LeftSection from '@/components/Form/LeftSection'
import { verifyEmailAPI } from '@/apis/authAPI'
import { useLocation } from 'react-router-dom'

const Verify = () => {
  const [values, setValues] = useState(Array(6).fill(''))
  const location = useLocation()
  const { email } = location.state || {}

  const handleChange = (e, index) => {
    const newValues = [...values]
    newValues[index] = e.target.value.slice(-1) // Chỉ lấy ký tự cuối cùng (tránh nhập nhiều ký tự)
    setValues(newValues)

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
    if (e.target.value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Xử lý phím backspace để di chuyển về ô trước đó
    if (e.key === 'Backspace' && index > 0 && !values[index]) {
      document.getElementById(`input-${index - 1}`).focus()
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const codeString = values.join('')
    verifyEmailAPI(email, codeString).then((response) => {
      console.log(response)
    })
  }

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
          <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
            Chúng tôi đã gửi mã xác thực qua email của bạn
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display='flex' justifyContent='center' gap={1} p={3}>
              {values.map((value, index) => (
                <TextField
                  key={index}
                  id={`input-${index}`}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
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
              // sx={{
              //   mt: 3,
              //   background: !isSubmitDisabled ? 'linear-gradient(to right, #673ab7, #2196f3)' : undefined
              //   // Add any additional styling if needed
              // }}
              // disabled={isSubmitDisabled} // Disable button based on the state
            >
              Gửi
            </Button>
          </form>
        </Box>
      </Box>
    </FlexCenter>
  )
}

export default Verify
