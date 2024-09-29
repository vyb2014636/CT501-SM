import React from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import FlexRow from '../Flex/FlexRow'

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
