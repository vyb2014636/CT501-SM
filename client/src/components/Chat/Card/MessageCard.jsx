import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { isMe } from '@/utils/helpers'
import FlexColumn from '@/components/Common/Flex/FlexColumn'

const MessageCard = ({ message, currentUser }) => {
  // Xử lý tin nhắn dạng "notify" (thông báo)
  if (message?.type === 'notify') {
    return (
      <Box display='flex' justifyContent='center' bgcolor='background.default' m={1} p={1} width='50%' mx='auto' borderRadius={2}>
        {message?.content}
      </Box>
    )
  }

  // Xử lý các loại tin nhắn khác
  const isCurrentUser = message.sender._id === currentUser._id

  return (
    <FlexColumn display='flex' alignItems={isCurrentUser ? 'flex-end' : 'flex-start'}>
      <FlexRow sx={{ maxWidth: '60%', alignItems: 'end', m: 1, gap: 1 }}>
        {!isCurrentUser && <Avatar src={message.sender.avatar} />}
        <FlexColumn gap={2} alignItems={isCurrentUser && 'end'} width={1}>
          {message?.image && (
            <Box
              p={1}
              sx={{
                // bgcolor: isCurrentUser ? '#42a5f5' : 'background.message',
                boxShadow: 3,
                color: isCurrentUser ? 'white' : 'text.message',
                borderRadius: '12px'
              }}>
              <img
                src={message?.image} // Đường dẫn ảnh
                alt='message'
                style={{
                  maxWidth: '300px', // Giới hạn kích thước của ảnh
                  borderRadius: '8px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}
          {message?.content && (
            <Box
              p={3}
              sx={{
                bgcolor: isCurrentUser ? '#42a5f5' : 'background.message',
                color: isCurrentUser ? 'white' : 'text.message',
                borderRadius: '12px',
                width: 'fit-content', // Điều chỉnh chiều rộng của Box theo nội dung
                wordWrap: 'break-word', // Đảm bảo chữ dài sẽ xuống dòng
                whiteSpace: 'normal', // Cho phép dòng chữ dài xuống dòng khi cần.
                maxWidth: 400
              }}>
              <Typography>{message.content}</Typography>
            </Box>
          )}
        </FlexColumn>
      </FlexRow>

      <FlexRow
        sx={{
          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
          gap: 1,
          alignItems: 'center',
          ml: !isCurrentUser ? 13 : 0 // Điều chỉnh khoảng cách tùy thuộc vào vị trí avatar
        }}>
        <Typography variant='caption' display='block' textAlign={isCurrentUser ? 'right' : 'left'}>
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: vi })}
        </Typography>
      </FlexRow>
    </FlexColumn>
  )
}

export default MessageCard
