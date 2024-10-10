import React, { useState } from 'react'
import FlexRow from '../../Common/Flex/FlexRow'
import { Avatar, Button, Typography } from '@mui/material'
import FlexColumn from '../../Common/Flex/FlexColumn'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { avatarStyleMui, titleAvatarStyleMui } from '@/styles/styles'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { cancelFriendRequest, sendFriendRequest } from '@/features/request/requestThunk'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const SearchCard = ({ user }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const { sends } = useSelector((state) => state.request)
  const isFriend = currentUser.friends.some((userCheck) => userCheck._id === user._id)
  const hasSentRequest = sends.some((send) => send.to._id === user._id)

  const handleProfileClick = useProfileNavigation()
  const handleAddFriend = async () => {
    try {
      await dispatch(sendFriendRequest(user._id)).unwrap()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCancelRequest = async () => {
    try {
      await dispatch(cancelFriendRequest(user._id)).unwrap()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <FlexRow key={user._id} sx={{ alignItems: 'center', gap: '12px', p: 2 }}>
      <Avatar alt={user.lastname} src={user.avatar} sx={{ width: 44, height: 44, ...avatarStyleMui }} onClick={() => handleProfileClick(user._id)} />
      <FlexColumn>
        <Typography variant='subtitle1' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(user._id)}>
          {user.fullname}
        </Typography>
        <Typography variant='body2'>4 bài viết</Typography>
      </FlexColumn>
      <FlexRow ml='auto'>
        <Button
          variant='outlined'
          sx={{ ...styleFlexCenterButton }}
          onClick={isFriend ? () => handleProfileClick(user._id) : hasSentRequest ? handleCancelRequest : handleAddFriend}>
          {isFriend && (
            <>
              <SendOutlinedIcon />
              <Typography variant='body1' fontWeight='bold'>
                Nhắn tin
              </Typography>
            </>
          )}
          {hasSentRequest && (
            <Typography variant='body1' fontWeight='bold'>
              Hủy lời mời
            </Typography>
          )}
          {currentUser._id !== user._id && !hasSentRequest && !isFriend && (
            <Typography variant='body1' fontWeight='bold'>
              Thêm bạn
            </Typography>
          )}
        </Button>
      </FlexRow>
    </FlexRow>
  )
}

export default SearchCard
