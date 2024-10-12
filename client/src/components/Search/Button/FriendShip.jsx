import { Button, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { toast } from 'react-toastify'
import { acceptFriendRequest, cancelFriendRequest, sendFriendRequest, unFriend } from '@/features/request/requestThunk'
import FlexRow from '@/components/Common/Flex/FlexRow'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const FriendButton = ({ onClick, variant, icon, label }) => (
  <Button variant={variant} sx={{ ...styleFlexCenterButton }} onClick={onClick}>
    {!icon ? <SendOutlinedIcon /> : icon}
    <Typography variant='body1' fontWeight='bold'>
      {label}
    </Typography>
  </Button>
)

const FriendShip = ({ user, inProfile }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const { sends, requests } = useSelector((state) => state.request)

  const isFriend = useMemo(() => currentUser.friends.some((friend) => friend._id === user._id), [currentUser.friends, user._id])

  const hasSentRequest = useMemo(() => sends.some((send) => send.to._id === user._id), [sends, user._id])

  const hasReceiveRequest = useMemo(
    () => requests.some((receive) => receive.from._id === user._id && receive.to._id === currentUser._id),
    [requests, user._id, currentUser._id]
  )

  const handleRequest = async (action, successMessage) => {
    try {
      await dispatch(action(user._id)).unwrap()
      toast.success(successMessage)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <FlexRow gap={2}>
      {isFriend ? (
        inProfile ? (
          <FriendButton
            onClick={() => handleRequest(unFriend, 'Đã hủy kết bạn')}
            variant='contained'
            icon={<PersonRemoveAlt1OutlinedIcon />}
            label='Hủy kết bạn'
          />
        ) : (
          <FriendButton variant='outlined' icon={<SendOutlinedIcon />} label='Nhắn tin' />
        )
      ) : hasSentRequest ? (
        <FriendButton
          onClick={() => handleRequest(cancelFriendRequest, 'Đã hủy lời mời kết bạn')}
          variant='contained'
          icon={<CancelOutlinedIcon />}
          label='Hủy lời mời'
        />
      ) : hasReceiveRequest ? (
        <FriendButton
          onClick={() => handleRequest(acceptFriendRequest, 'Đã chấp nhận lời mời kết bạn')}
          variant='contained'
          icon={<CheckOutlinedIcon />}
          label='Đồng ý'
        />
      ) : currentUser._id !== user._id ? (
        <FriendButton
          onClick={() => handleRequest(sendFriendRequest, 'Đã gửi lời mời kết bạn')}
          variant='contained'
          icon={<PersonAddAlt1OutlinedIcon />}
          label='Thêm bạn'
        />
      ) : null}
      {inProfile && <FriendButton variant='outlined' icon={<SendOutlinedIcon />} label='Nhắn tin' />}
    </FlexRow>
  )
}

export default FriendShip
