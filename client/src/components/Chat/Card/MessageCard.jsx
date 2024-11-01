import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { isMe } from '@/utils/helpers'

const MessageCard = ({ message, currentUser }) => {
  return message.type === 'text' ? (
    <Box display='flex' justifyContent={message.sender._id === currentUser._id ? 'flex-end' : 'flex-start'}>
      <FlexRow sx={{ maxWidth: '60%', alignItems: 'end', m: 1, gap: 1 }}>
        {!isMe(message.sender._id, currentUser._id) && <Avatar src={message.sender.avatar} />}
        <Box
          p={3}
          sx={{
            bgcolor: isMe(message.sender._id, currentUser._id) ? '#42a5f5' : 'background.message',
            color: isMe(message.sender._id, currentUser._id) ? 'white' : 'text.message',
            borderRadius: '12px'
          }}>
          <Typography>{message.content}</Typography>
          <Typography variant='caption' display='block' textAlign='right'>
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: vi })}
          </Typography>
        </Box>
      </FlexRow>
    </Box>
  ) : (
    message.type === 'notify' && (
      <Box display='flex' justifyContent='center'>
        <Typography>Thông báo</Typography>
      </Box>
    )
  )
}

export default MessageCard
