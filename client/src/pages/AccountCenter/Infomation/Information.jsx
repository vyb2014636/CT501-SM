import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import NameModal from './NameModal'
import AddressModal from './AddressModal' // Import AddressModal
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Information = () => {
  const currentUser = useSelector((state) => state.auth.user)
  const [openNameModal, setOpenNameModal] = useState(false)
  const [openAddressModal, setOpenAddressModal] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('error')

  const handleOpenNameModal = () => {
    const currentDate = new Date()
    const lastChangeDate = currentUser?.lastInfoChange ? new Date(currentUser.lastInfoChange) : null

    if (lastChangeDate) {
      const timeDiff = currentDate - lastChangeDate
      const daysDiff = timeDiff / (1000 * 3600 * 24)

      if (daysDiff < 60) {
        setSnackbarMessage(`Bạn không thể thay đổi tên trong vòng ${60 - Math.floor(daysDiff)} ngày nữa.`)
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
        return
      }
    }

    setOpenNameModal(true) // Mở modal nếu chưa thay đổi tên trong 60 ngày
  }

  const handleOpenAddressModal = () => setOpenAddressModal(true) // Mở modal địa chỉ

  const handleCloseNameModal = () => {
    setOpenNameModal(false)
  }

  const handleCloseAddressModal = () => setOpenAddressModal(false) // Đóng modal địa chỉ

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box width={1}>
      <Typography variant='h4' fontWeight='bold' gutterBottom>
        Thông tin tài khoản
      </Typography>
      <Box>
        <Typography variant='caption' color='textSecondary'>
          Quản lý thông tin trên trang cá nhân
        </Typography>
      </Box>
      <FlexColumn py={4} alignItems='center' gap={4}>
        <FlexColumn alignItems='center'>
          <Avatar src={currentUser?.avatar} sx={{ height: 100, width: 100 }} />
          <Typography variant='body1' fontWeight='bold'>
            {currentUser?.fullname}
          </Typography>
          <Typography variant='body2' color='primary' fontWeight='bold'>
            Vmedia
          </Typography>
        </FlexColumn>
        <List
          sx={{
            py: 0,
            width: 1,
            borderRadius: 4,
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}>
          <ListItemButton onClick={handleOpenNameModal}>
            <ListItemText>
              <Typography variant='body1' fontWeight='bold'>
                Họ tên
              </Typography>
              <Typography color='GrayText'>{currentUser?.fullname}</Typography>
            </ListItemText>
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
          <Divider component='li' />
          <ListItemButton>
            <ListItemText>
              <Typography variant='body1' fontWeight='bold'>
                Email
              </Typography>
              <Typography color='GrayText'>{currentUser?.email}</Typography>
            </ListItemText>
          </ListItemButton>
          <Divider component='li' />
          <ListItemButton onClick={handleOpenAddressModal}>
            <ListItemText>
              <Typography variant='body1' fontWeight='bold'>
                Địa chỉ
              </Typography>
              <Typography color='GrayText'>{currentUser?.province || 'Chưa nhập địa chỉ'}</Typography>
            </ListItemText>
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
        </List>
      </FlexColumn>

      {/* Name Modal */}
      <NameModal
        open={openNameModal}
        onClose={handleCloseNameModal}
        currentName={{
          firstname: currentUser?.firstname,
          lastname: currentUser?.lastname
        }}
      />

      {/* Address Modal */}
      <AddressModal
        open={openAddressModal}
        onClose={handleCloseAddressModal}
        currentAddress={currentUser?.province || ''} // Cung cấp thông tin địa chỉ hiện tại
      />

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Information
