import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import FlexRow from '../../Flex/FlexRow'
import { useDispatch } from 'react-redux'
import { addComment } from '@/features/comment/commentThunk'
import { toast } from 'react-toastify'

const CommentForm = ({ user, post }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  const handleSendComment = async () => {
    if (newComment !== '') {
      try {
        dispatch(addComment({ postId: post._id, content: newComment }))
        setNewComment('')
      } catch {
        toast.error('Thất bại')
      }
    }
  }

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
