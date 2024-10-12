import React from 'react'
import { Avatar, Box, Button, MenuItem, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { acceptFriendRequest, rejectFriendRequest } from '@/features/request/requestThunk'
import { toast } from 'react-toastify'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { useNavigate } from 'react-router-dom'

const FriendRequestCard = ({ user, handleClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAcceptAddFriend = async (event, from) => {
    event.stopPropagation()
    try {
      dispatch(acceptFriendRequest(from)).unwrap()
      toast.success('Đồng ý thành công')
      handleClose()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRejectAddFriend = async (event, from) => {
    event.stopPropagation()
    try {
      dispatch(rejectFriendRequest(from))
      handleClose()
      toast.info('Đã hủy kết bạn')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <MenuItem onClick={() => navigate(`/personal/${user._id}`)}>
      <Avatar alt={user.fullname} src={user.avatar} sx={{ width: 55, height: 55, alignSelf: 'start', m: 1 }} />
      <Box>
        <Typography
          variant='body1'
          sx={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'normal'
          }}>
          <strong> {user.fullname} </strong>đã gửi cho bạn lời mời kết bạn.
        </Typography>
        <Typography variant='caption' color='primary' sx={{ whiteSpace: 'normal' }}>
          1 ngày trước
        </Typography>
        <Typography variant='caption' color='text' display='block' sx={{ whiteSpace: 'normal' }}>
          6 bạn chung
        </Typography>
        <FlexRow gap={2}>
          <Button variant='contained' size='small' sx={{ width: '100px' }} onClick={(event) => handleAcceptAddFriend(event, user._id)}>
            Đồng ý
          </Button>
          <Button variant='outlined' size='small' sx={{ width: '100px' }} onClick={(event) => handleRejectAddFriend(event, user._id)}>
            Từ chối
          </Button>
        </FlexRow>
      </Box>
    </MenuItem>
  )
}

export default FriendRequestCard
