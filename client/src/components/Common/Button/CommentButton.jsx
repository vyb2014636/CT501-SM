import React, { memo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FlexColumn from '../Flex/FlexColumn'
import CommentForm from '../Form/CommentForm'
import TitleModal from '../Modal/Title/TitleModal'
import { fetchComments } from '@/features/comment/commentThunk'
import { resetCommentState } from '@/features/comment/commentSlice'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import { styleThreeButton } from '@/styles/stylePost/style'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import Comment from '../Comment/Comment'

const ButtonComment = ({ post }) => {
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

      <Modal open={open} onClose={handleClose}>
        <FlexColumn sx={{ ...styleModal, height: 600, p: 0, overflow: 'hidden' }}>
          <TitleModal title='Bình luận' />

          <Divider />

          <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }} ref={commentsRef}>
            {loading && comments.length === 0 ? (
              <Skeleton variant='rectangular' width='100%' height={60} animation='wave' />
            ) : comments.length === 0 ? (
              <Typography variant='body1' align='center' sx={{ mt: 2 }}>
                Không có bình luận nào được đăng
              </Typography>
            ) : (
              comments?.map((comment) => (
                <Comment key={comment._id} post={post} comment={comment} user={comment.user} dispatch={dispatch} replies={comment.replies} />
              ))
            )}
            {loading && comments.length > 0 && <Skeleton variant='rectangular' width='100%' height={60} animation='wave' />}
          </Box>

          <Divider />

          <CommentForm user={user} post={post} />
        </FlexColumn>
      </Modal>
    </>
  )
}

export default memo(ButtonComment)
