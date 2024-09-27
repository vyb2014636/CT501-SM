import { Box, IconButton, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send'

const ReplyForm = ({ replyText, setReplyText, handleSendReply, comment }) => {
  return (
    <Box display='flex' alignItems='center' mt={1}>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        placeholder='Viết phản hồi...'
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <IconButton color='primary' onClick={() => handleSendReply(comment._id)}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ReplyForm
