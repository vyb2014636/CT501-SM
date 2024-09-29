import React from 'react'
import Box from '@mui/material/Box'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

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
