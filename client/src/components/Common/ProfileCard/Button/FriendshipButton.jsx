import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useDispatch, useSelector } from 'react-redux'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { checkFriendshipStatus, resetFriendship } from '@/features/request/friendshipSlice'
import { acceptFriendRequest, cancelFriendRequest, sendFriendRequest, unFriend } from '@/features/request/requestThunk'
import { toast } from 'react-toastify'
import { updateFriends } from '@/features/auth/authSlice'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const FriendshipButton = ({ userId, showChat, status }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   dispatch(resetFriendship()), dispatch(checkFriendshipStatus(userId))
  // }, [dispatch, userId])

  const handleClickCancel = async () => {
    try {
      let response
      if (status === 'accepted') {
        response = await dispatch(unFriend(userId)).unwrap()
        // dispatch(updateFriends({ user: response.request.to, actionType: 'remove' }))
      } else if (status === 'pending') {
        response = await dispatch(cancelFriendRequest(userId)).unwrap()
      } else if (status === 'incoming') {
        response = await dispatch(acceptFriendRequest(userId)).unwrap()
        // dispatch(updateFriends({ user: response.request.from, actionType: 'add' }))
      } else {
        response = await dispatch(sendFriendRequest(userId)).unwrap()
      }
      toast.success(response.message, { position: 'bottom-right' })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const renderButton = () => {
    if (userId === user._id) return <></>
    if (status === 'accepted')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} color='info' onClick={handleClickCancel}>
          <PersonRemoveAlt1OutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy kết bạn
          </Typography>
        </Button>
      )

    if (status === 'pending')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleClickCancel}>
          <CancelOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy lời mời
          </Typography>
        </Button>
      )
    if (status === 'incoming')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleClickCancel}>
          <CheckOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Đồng ý
          </Typography>
        </Button>
      )

    return (
      <Button variant='contained' sx={{ ...styleFlexCenterButton }} onClick={handleClickCancel}>
        <PersonAddAlt1OutlinedIcon />
        <Typography variant='body1' fontWeight='bold'>
          Thêm bạn
        </Typography>
      </Button>
    )
  }

  return (
    <FlexRow gap={2}>
      {renderButton()}
      {showChat && (
        <Button variant='outlined' sx={{ ...styleFlexCenterButton }}>
          <SendOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Nhắn tin
          </Typography>
        </Button>
      )}
    </FlexRow>
  )
}

export default FriendshipButton
