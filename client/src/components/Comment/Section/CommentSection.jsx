import React, { memo, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { addReplyForComment } from '@/features/comment/commentThunk'
import ReplyForm from '../Form/ReplyForm'
import CommentCard from '../Item/CommentCard'
import ReplyCard from '../Item/ReplyCard'
import { Typography } from '@mui/material'

const CommentSection = ({ post, comment, user, dispatch }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [replyCount, setReplyCount] = useState(3)
  const currentUser = useSelector((state) => state.auth.user)

  const isLiked = comment.likes.some((like) => like._id === currentUser._id)
  const handleClickReply = () => {
    setShowReplyInput(!showReplyInput)
  }

  const handleShowReplies = () => {
    setShowReplies(true)
  }
  const handleHiddenReplies = () => {
    setShowReplies(false)
    setReplyCount(3)
  }

  return (
    <Box display='flex' flexDirection='column' mb={2} position='relative'>
      <CommentCard user={user} comment={comment} handleClickReply={handleClickReply} postId={post._id} isLiked={isLiked} />

      {showReplyInput && (
        <ReplyForm post={post} comment={comment} dispatch={dispatch} setShowReplies={setShowReplies} setShowReplyInput={setShowReplyInput} />
      )}

      {showReplies &&
        comment.replies
          .slice(0, replyCount)
          .map((reply) => <ReplyCard key={reply._id} postId={post._id} commentId={comment._id} user={reply.user} reply={reply} />)}

      {comment.replies?.length > 0 &&
        (!showReplies ? (
          <Typography sx={{ cursor: 'pointer', ml: 12 }} variant='caption' size='small' onClick={handleShowReplies}>
            Xem phản hồi
          </Typography>
        ) : showReplies && comment.replies.length > replyCount ? (
          <Typography sx={{ cursor: 'pointer', ml: 12 }} variant='caption' onClick={() => setReplyCount(replyCount + 3)} size='small'>
            Xem thêm phản hồi
          </Typography>
        ) : (
          <Typography sx={{ cursor: 'pointer', ml: 12 }} variant='caption' size='small' onClick={handleHiddenReplies}>
            Ẩn phản hồi
          </Typography>
        ))}
    </Box>
  )
}

export default memo(CommentSection)
