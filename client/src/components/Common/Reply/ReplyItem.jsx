import { Avatar, Box, Button, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'
import { formatFullname } from '@/utils/helpers'

const ReplyItem = ({ user, reply }) => {
  return (
    <Box display='flex' alignItems='flex-start' mt={1} ml={8} key={reply._id}>
      <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
      <Box ml={2}>
        <Box sx={{ backgroundColor: 'background.default', borderRadius: '18px', px: 4, py: 1 }}>
          <Typography variant='body1' fontWeight='bold' fontSize='small'>
            {formatFullname(user.firstname, user.lastname)}
          </Typography>
          <Typography variant='body2' fontSize='small'>
            {reply.content}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          <Button size='small' color='primary'>
            <FavoriteIcon fontSize='small' />
            <Typography variant='caption' ml={0.5}>
              Thích
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ReplyItem
