import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { toast } from 'react-toastify'
import { acceptFriendRequest, cancelFriendRequest, sendFriendRequest } from '@/features/request/requestThunk'
import { updateFriends } from '@/features/auth/authSlice'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const FriendShip = ({ user }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const { sends, requests } = useSelector((state) => state.request)
  console.log(currentUser)
  const isFriend = currentUser.friends.some((userCheck) => userCheck._id === user._id)
  const hasSentRequest = sends.some((send) => send.to._id === user._id)
  const hasReceiveRequest = requests.some((receive) => receive.from._id === user._id && receive.to._id === currentUser._id)

  const handleAddFriend = async () => {
    try {
      await dispatch(sendFriendRequest(user._id)).unwrap()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCancelSendRequest = async () => {
    try {
      await dispatch(cancelFriendRequest(user._id)).unwrap()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCAcceptRequest = async () => {
    try {
      const response = await dispatch(acceptFriendRequest(user._id)).unwrap()
      dispatch(updateFriends({ user: response.request.from, actionType: 'add' }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {isFriend && (
        <Button variant='outlined' sx={{ ...styleFlexCenterButton }}>
          <SendOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Nhắn tin
          </Typography>
        </Button>
      )}

      {hasSentRequest && (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleCancelSendRequest}>
          <Typography variant='body1' fontWeight='bold'>
            Hủy lời mời
          </Typography>
        </Button>
      )}
      {hasReceiveRequest && (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleCAcceptRequest}>
          <Typography variant='body1' fontWeight='bold'>
            Đồng ý
          </Typography>
        </Button>
      )}
      {currentUser._id !== user._id && !hasSentRequest && !hasReceiveRequest && !isFriend && (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleAddFriend}>
          <Typography variant='body1' fontWeight='bold'>
            Thêm bạn
          </Typography>
        </Button>
      )}
    </>
  )
}

export default FriendShip
