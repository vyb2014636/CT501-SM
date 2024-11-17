import React, { memo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CommentForm from './Form/CommentForm'
import { fetchComments } from '@/features/comment/commentThunk'
import { resetCommentState } from '@/features/comment/commentSlice'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import { styleThreeButton } from '@/styles/stylePost/style'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import CommentSection from './Section/CommentSection'
import ModalWrapper from '../Common/Modal/ModalWrapper'

const CommentButton = ({ post }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const { comments, hasMoreComments, loading } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.auth)
  const commentsRef = useRef(null)

  const handleOpen = () => {
    setOpen(true)
    setPage(1)
    dispatch(fetchComments({ postId: post._id, page: 1 }))
  }

  const handleClose = () => {
    dispatch(resetCommentState())
    setOpen(false)
  }

  const loadMoreComments = () => {
    if (hasMoreComments && !loading) {
      setPage((prevPage) => prevPage + 1)
      dispatch(fetchComments({ postId: post._id, page: page + 1 }))
    }
  }

  useScrollInfinite(commentsRef, loadMoreComments, hasMoreComments)

  return (
    <>
      <Button sx={styleThreeButton} onClick={handleOpen}>
        <ChatBubbleOutlineIcon />
        <Typography variant='body1' fontWeight='bold'>
          Bình luận
        </Typography>
      </Button>

      <ModalWrapper open={open} onClose={handleClose} title='Bình luận' height={600}>
        <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }} ref={commentsRef}>
          {loading && comments?.length === 0 ? (
            <Skeleton variant='rectangular' width='100%' height={60} animation='wave' />
          ) : comments?.length === 0 ? (
            <Typography variant='body1' align='center' sx={{ mt: 2 }}>
              Không có bình luận nào được đăng
            </Typography>
          ) : (
            comments?.map((comment) => (
              <CommentSection key={comment._id} post={post} comment={comment} user={comment.user} dispatch={dispatch} replies={comment.replies} />
            ))
          )}
          {loading && comments?.length > 0 && <Skeleton variant='rectangular' width='100%' height={60} animation='wave' />}
        </Box>
        <CommentForm user={user} post={post} />
      </ModalWrapper>
    </>
  )
}

export default memo(CommentButton)
