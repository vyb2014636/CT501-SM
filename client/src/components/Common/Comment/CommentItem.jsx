import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyIcon from '@mui/icons-material/Reply'
import { formatFullname } from '@/utils/helpers'
import { addReplyForComment } from '@/features/comment/commentThunk'
import { toast } from 'react-toastify'
import ReplyForm from '@/components/Form/ReplyForm'
import ReplyItem from '../Reply/ReplyItem'

export const CommentItem = ({ post, comment, user, dispatch }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const [replyCount, setReplyCount] = useState(3)

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput)
  }

  const handleSendReply = (commentId) => {
    try {
      dispatch(addReplyForComment({ postId: post._id, commentId: commentId, content: replyText }))
      setReplyText('')
      setShowReplyInput(false)
      setShowReplies(true)
    } catch (error) {
      toast.error('Phản hồi thất bại')
    }
  }

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <Box display='flex' flexDirection='column' mb={2}>
      <Box display='flex' alignItems='flex-start'>
        <Avatar src={user.avatar} sx={{ width: 35, height: 35 }} />
        <Box ml={2}>
          <Box sx={{ backgroundColor: 'background.default', borderRadius: '18px', px: 4, py: 2 }}>
            <Typography variant='body1' fontWeight='bold' fontSize='small'>
              {formatFullname(user.firstname, user.lastname)}
            </Typography>
            <Typography variant='body2' fontSize='small'>
              {comment.content}
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Button size='small' color='primary'>
              <FavoriteIcon fontSize='small' />
              <Typography variant='caption' ml={0.5}>
                Thích
              </Typography>
            </Button>
            <Button size='small' color='primary' onClick={handleReplyClick}>
              <ReplyIcon fontSize='small' />
              <Typography variant='caption' ml={0.5}>
                Phản hồi
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      {showReplyInput && <ReplyForm replyText={replyText} setReplyText={setReplyText} handleSendReply={handleSendReply} comment={comment} />}

      {showReplies && comment.replies.slice(0, replyCount).map((reply) => <ReplyItem key={reply._id} user={reply.user} reply={reply} />)}

      {comment.replies?.length > 0 && <Button onClick={handleShowReplies}>{showReplies ? 'Ẩn phản hồi' : 'Xem phản hồi'}</Button>}

      {showReplies && comment.replies.length > replyCount && (
        <Button onClick={() => setReplyCount(replyCount + 3)} sx={{ mt: 1, ml: 4 }}>
          Xem thêm phản hồi
        </Button>
      )}
    </Box>
  )
}
