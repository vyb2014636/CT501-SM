import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'

const FriendshipButton = ({ statusFriendship, handleClickCancel }) => {
  const renderButton = () => {
    if (statusFriendship === 'friends')
      return (
        <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 152 }} color='info' onClick={handleClickCancel}>
          <PersonRemoveAlt1OutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy kết bạn
          </Typography>
        </Button>
      )

    if (statusFriendship === 'waitAccept')
      return (
        <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 152 }} onClick={handleClickCancel}>
          <CancelOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Hủy lời mời
          </Typography>
        </Button>
      )
    if (statusFriendship === 'waitMe')
      return (
        <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 120 }} onClick={handleClickCancel}>
          <CheckOutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Đồng ý
          </Typography>
        </Button>
      )

    if (statusFriendship === 'noRelationship')
      return (
        <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 138 }} onClick={handleClickCancel}>
          <PersonAddAlt1OutlinedIcon />
          <Typography variant='body1' fontWeight='bold'>
            Thêm bạn
          </Typography>
        </Button>
      )
    return <></>
  }

  return renderButton()
}

export default FriendshipButton
