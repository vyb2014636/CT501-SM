import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { addReplyForComment } from '@/features/comment/commentThunk'
import { toast } from 'react-toastify'
import ReplyForm from '@/components/Common/Form/ReplyForm'
import ReplyItem from './Reply/ReplyItem'
import CardComment from './CardComent'
import { useSelector } from 'react-redux'

export const Comment = ({ post, comment, user, dispatch }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const [replyCount, setReplyCount] = useState(3)
  const currentUser = useSelector((state) => state.auth.user)

  const isLiked = comment.likes.includes(currentUser._id)

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
      <CardComment user={user} comment={comment} handleReplyClick={handleReplyClick} postId={post._id} isLiked={isLiked} />

      {showReplyInput && <ReplyForm replyText={replyText} setReplyText={setReplyText} handleSendReply={handleSendReply} comment={comment} />}

      {showReplies &&
        comment.replies
          .slice(0, replyCount)
          .map((reply) => <ReplyItem key={reply._id} postId={post._id} commentId={comment._id} user={reply.user} reply={reply} />)}

      {comment.replies?.length > 0 && <Button onClick={handleShowReplies}>{showReplies ? 'Ẩn phản hồi' : 'Xem phản hồi'}</Button>}

      {showReplies && comment.replies.length > replyCount && (
        <Button onClick={() => setReplyCount(replyCount + 3)} sx={{ mt: 1, ml: 4 }}>
          Xem thêm phản hồi
        </Button>
      )}
    </Box>
  )
}
