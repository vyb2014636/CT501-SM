import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import FlexCenter from '@/components/Common/Flex/FlexCenter'
import LeftSection from '@/components/user/Section/LeftSection'
import { verifyEmailAPI } from '@/apis/auth/authAPI'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatTime, setFalse, setValues } from '@/utils/helpers'
import Swal from 'sweetalert2'
import { styleForm } from '@/styles/styleAuth/style'
import VerifyForm from '@/components/user/Form/VerifyForm'

const Verify = () => {
  const location = useLocation()
  const [timeExpired, setTimeExpired] = useState(60)
  const { email } = location.state || {}

  return (
    <Box sx={styleForm}>
      <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2} color='primary'>
        Xác thực tài khoản
      </Typography>
      <Typography variant='body2' color='textSecondary' textAlign='center' mt={2}>
        Để hoàn tất cho quá trình đăng ký, bạn cần xác thực tài khoản .
      </Typography>
      <Typography variant='body2' color='textSecondary' textAlign='center' mt={2} align='center'>
        Chúng tôi đã gửi mã xác thực qua email {email} của bạn mã xác thực sẽ tồn tại trong :{formatTime(timeExpired)}
      </Typography>
      <VerifyForm email={email} timeExpired={timeExpired} setTimeExpired={setTimeExpired} />
    </Box>
  )
}

export default Verify
