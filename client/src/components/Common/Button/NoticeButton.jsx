import React from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'

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
