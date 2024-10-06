import React, { memo, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ReplyForm from '@/components/Common/Comment/Form/ReplyForm'
import ItemComment from '@/components/Common/Comment/Item/ItemComment'
import ItemReply from '@/components/Common/Comment/Item/ItemReply'
import { addReplyForComment } from '@/features/comment/commentThunk'

const CommentSession = ({ post, comment, user, dispatch }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const [replyCount, setReplyCount] = useState(3)
  const currentUser = useSelector((state) => state.auth.user)

  const isLiked = comment.likes.some((like) => like._id === currentUser._id)
  const handleClickReply = () => {
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
      <ItemComment user={user} comment={comment} handleClickReply={handleClickReply} postId={post._id} isLiked={isLiked} />

      {showReplyInput && <ReplyForm replyText={replyText} setReplyText={setReplyText} handleSendReply={handleSendReply} comment={comment} />}

      {showReplies &&
        comment.replies
          .slice(0, replyCount)
          .map((reply) => <ItemReply key={reply._id} postId={post._id} commentId={comment._id} user={reply.user} reply={reply} />)}

      {comment.replies?.length > 0 && (
        <Button size='small' onClick={handleShowReplies}>
          {showReplies ? 'Ẩn phản hồi' : 'Xem phản hồi'}
        </Button>
      )}

      {showReplies && comment.replies.length > replyCount && (
        <Button onClick={() => setReplyCount(replyCount + 3)} sx={{ mt: 1, ml: 4 }}>
          Xem thêm phản hồi
        </Button>
      )}
    </Box>
  )
}

export default memo(CommentSession)
