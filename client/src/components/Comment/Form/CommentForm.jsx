import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch } from 'react-redux'
import { addComment } from '@/features/comment/commentThunk'
import { toast } from 'react-toastify'
import FlexRow from '@/components/Common/Flex/FlexRow'

const CommentForm = ({ user, post }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  const handleSendComment = async (e) => {
    e.preventDefault()

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
    <form onSubmit={handleSendComment}>
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
        <Button variant='contained' color='primary' endIcon={<SendIcon />} type='submit'>
          Gửi
        </Button>
      </FlexRow>
    </form>
  )
}

export default CommentForm
