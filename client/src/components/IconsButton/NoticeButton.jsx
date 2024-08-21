import React from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

const NoticeButton = () => {
  return (
    <IconButton>
      <Badge color='primary' variant='dot'>
        <NotificationsNoneOutlinedIcon color='primary' />
      </Badge>
    </IconButton>
  )
}

export default NoticeButton
