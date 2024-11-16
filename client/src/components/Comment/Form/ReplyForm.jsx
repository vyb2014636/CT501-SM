import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { addReplyForComment } from '@/features/comment/commentThunk'
import { toast } from 'react-toastify'

const ReplyForm = ({ post, comment, dispatch, setShowReplies, setShowReplyInput }) => {
  const [replyText, setReplyText] = useState('')

  const handleSendReply = async (e) => {
    e.preventDefault()

    dispatch(addReplyForComment({ postId: post._id, commentId: comment._id, content: replyText }))
      .unwrap()
      .then(async (res) => {
        setReplyText('')
        setShowReplyInput(false)
        setShowReplies(true)
      })
      .catch((error) => {
        toast.error(error.message || 'Phản hồi thất bại')
      })
  }

  return (
    <form onSubmit={handleSendReply}>
      <Box display='flex' alignItems='center' mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          placeholder='Viết phản hồi...'
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        {/* Remove onClick and rely on form submit */}
        <IconButton color='primary' type='submit'>
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  )
}

export default ReplyForm
