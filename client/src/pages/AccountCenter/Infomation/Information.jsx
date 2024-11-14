import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import FlexColumn from '@/components/Common/Flex/FlexColumn'

const style = {
  py: 0,
  width: 1,
  borderRadius: 4,
  borderColor: 'divider',
  backgroundColor: 'background.paper'
}

const Information = () => {
  const currentUser = useSelector((state) => state.auth.user)

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
          <Avatar src={currentUser.avatar} sx={{ height: 100, width: 100 }} />
          <Typography variant='body1' fontWeight='bold'>
            {currentUser.fullname}
          </Typography>
          <Typography variant='body2' color='primary' fontWeight='bold'>
            Vmedia
          </Typography>
        </FlexColumn>
        <List sx={style}>
          <ListItemButton>
            <ListItemText primary='Tên' />
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
          <Divider component='li' />
          <ListItemButton>
            <ListItemText primary='Địa chỉ' />
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
          <Divider component='li' />
          <ListItemButton>
            <ListItemText primary='Ảnh đại diện' />
            <ArrowForwardIosOutlinedIcon />
          </ListItemButton>
        </List>
      </FlexColumn>

      {/* <ModalWrapper open={openModal} onClose={handleCloseModal} title='Đổi mật khẩu'>
        <ChangePassword onClose={handleCloseModal} />
      </ModalWrapper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='info' sx={{ width: '100%' }}>
          Bạn đã thay đổi mật khẩu trong vòng 24 giờ. Hãy quay lại sau để thay đổi mật khẩu.
        </Alert>
      </Snackbar> */}
    </Box>
  )
}

export default Information
