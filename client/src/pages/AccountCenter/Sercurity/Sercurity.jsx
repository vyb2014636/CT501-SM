import React, { useState } from 'react'
import { Box, Typography, List, ListItemButton, ListItemText, Divider, Snackbar, Alert } from '@mui/material'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ChangePassword from './ChangePassword'
import TwoFactorAuth from './TwoFactorAuth'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { updated2FA } from '@/features/auth/authSlice'

const style = {
  py: 0,
  width: 1,
  borderRadius: 4,
  borderColor: 'divider',
  backgroundColor: 'background.paper'
}

const Sercurity = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false) // Snackbar để thông báo
  const currentUser = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleChangePasswordClick = () => {
    // Kiểm tra thời gian thay đổi mật khẩu
    const lastPasswordChange = new Date(currentUser?.lastPasswordChange)
    const currentTime = new Date()
    const timeDiff = currentTime - lastPasswordChange
    const timeDiffInHours = timeDiff / (1000 * 3600) // Chuyển đổi từ milliseconds sang giờ

    if (timeDiffInHours < 24) {
      // Nếu thay đổi mật khẩu trong vòng 24 giờ, thông báo cho người dùng
      setOpenSnackbar(true)
    } else {
      setOpenModal(true) // Mở modal nếu không có vấn đề
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleUpdate2FAStatus = (isEnabled) => {
    dispatch(updated2FA(isEnabled))
  }
  console.log(currentUser)
  return (
    <Box width={1}>
      <Typography variant='h4' fontWeight='bold' gutterBottom>
        Mật khẩu và bảo mật
      </Typography>
      <Box>
        <Typography variant='h6' color='textSecondary' fontWeight='bold'>
          Đăng nhập & khôi phục
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          Quản lý mật khẩu, tùy chọn đăng nhập và phương thức khôi phục.
        </Typography>
      </Box>
      <Box py={3}>
        <List sx={style}>
          <ListItemButton onClick={handleChangePasswordClick}>
            <ListItemText primary='Đổi mật khẩu' />
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
          <Divider component='li' />
          <ListItemButton>
            <ListItemText primary='Xác thực 2 bước' />
            <TwoFactorAuth is2FAEnabled={currentUser?.is2FAEnabled} onToggle2FA={handleUpdate2FAStatus} email={currentUser?.email} />
          </ListItemButton>
        </List>
      </Box>

      <ModalWrapper open={openModal} onClose={handleCloseModal} title='Đổi mật khẩu'>
        <ChangePassword onClose={handleCloseModal} />
      </ModalWrapper>

      {/* Snackbar thông báo khi không thể đổi mật khẩu trong 24h */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='info' sx={{ width: '100%' }}>
          Bạn đã thay đổi mật khẩu trong vòng 24 giờ. Hãy quay lại sau để thay đổi mật khẩu.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Sercurity
