import React from 'react'
import FlexRow from '../Flex/FlexRow'
import { Avatar, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CommentForm = ({ user, handleSendComment, setNewComment, newComment }) => {
  return (
    <FlexRow mt='auto' p={4}>
      <Avatar alt={user.lastname} src={user.avatar} />
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        placeholder='Viết bình luận...'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ mx: 2 }}
      />
      <Button variant='contained' color='primary' endIcon={<SendIcon />} onClick={handleSendComment}>
        Gửi
      </Button>
    </FlexRow>
  )
}

export default CommentForm
