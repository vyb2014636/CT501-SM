import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { acceptAddFriendAPI, cancelAddFriendAPI, unFriendAPI, checkFriendshipAPI, sendFriendAPI } from '@/apis/user/userAPI'
import { useSelector } from 'react-redux'
import FlexRow from '@/components/Common/Flex/FlexRow'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const FriendshipButton = ({ userId, showChat }) => {
  const [statusFriendship, setStatusFriendship] = useState('')
  const [requestId, setRequestId] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleClickCancel = async () => {
    try {
      if (statusFriendship === 'friends') {
        await unFriendAPI(userId)
      } else if (statusFriendship === 'waitAccept') {
        await cancelAddFriendAPI({ to: userId })
      } else if (statusFriendship === 'waitMe') {
        await acceptAddFriendAPI(requestId)
      } else {
        await sendFriendAPI({ to: userId })
      }

      await fetchFriendshipStatus()
    } catch (error) {
      console.error('Error updating friendship status:', error)
    }
  }

  const renderButton = () => {
    if (userId === user._id) return <></>
    if (statusFriendship === 'friends')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton, width: 152 }} color='info' onClick={handleClickCancel}>
          <PersonRemoveAlt1OutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy kết bạn
          </Typography>
        </Button>
      )

    if (statusFriendship === 'waitAccept')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton, width: 152 }} onClick={handleClickCancel}>
          <CancelOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy lời mời
          </Typography>
        </Button>
      )
    if (statusFriendship === 'waitMe')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton, width: 120 }} onClick={handleClickCancel}>
          <CheckOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Đồng ý
          </Typography>
        </Button>
      )

    if (statusFriendship === 'noRelationship')
      return (
        <Button variant='contained' sx={{ ...styleFlexCenterButton, width: 138 }} onClick={handleClickCancel}>
          <PersonAddAlt1OutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Thêm bạn
          </Typography>
        </Button>
      )
  }

  const fetchFriendshipStatus = async () => {
    const response = await checkFriendshipAPI(userId)
    setStatusFriendship(response.status)
    if (response?.requestId) setRequestId(response.requestId)
    else setRequestId(null)
  }

  useEffect(() => {
    fetchFriendshipStatus()
  }, [])

  return (
    <FlexRow gap={2}>
      {renderButton()}
      {showChat && (
        <Button variant='outlined' sx={{ ...styleFlexCenterButton, width: 126 }}>
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
