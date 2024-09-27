import { styleThreeButton } from '@/styles/stylePost/style'
import { Button, Divider, Modal, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import React, { memo, useState } from 'react'
import { styleModal } from '@/styles/styles'
import FlexColumn from '../Flex/FlexColumn'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, fetchComments } from '@/features/comment/commentThunk'
import { resetCommentState } from '@/features/comment/commentSlice'
import TitleModal from '../Common/Title/TitleModal'
import CommentForm from '../Form/CommentForm'
import Comments from '../Common/Comment/Comments'

const ModalComment = ({ post }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [page, setPage] = useState(1)
  const { comments } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.auth)

  const handleOpen = () => {
    setOpen(true)
    try {
      dispatch(fetchComments({ postId: post._id, page: page }))
    } catch (error) {
      toast.error('Thất bại')
    }
  }

  const handleClose = () => {
    dispatch(resetCommentState())
    setOpen(false)
  }

  const handleSendComment = async () => {
    try {
      dispatch(addComment({ postId: post._id, content: newComment }))
      setNewComment('')
    } catch (error) {
      toast.error('Thất bại')
    }
  }

  return (
    <>
      <Button sx={styleThreeButton} onClick={handleOpen}>
        <ChatBubbleOutlineIcon />
        <Typography variant='body1' fontWeight='bold'>
          Bình luận
        </Typography>
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <FlexColumn sx={{ ...styleModal, height: '600px', p: 0, overflow: 'hidden' }}>
          <TitleModal title='Bình luận' />

          <Divider />

          <Comments comments={comments} dispatch={dispatch} post={post} />

          <Divider />
          <CommentForm user={user} handleSendComment={handleSendComment} setNewComment={setNewComment} newComment={newComment} />
        </FlexColumn>
      </Modal>
    </>
  )
}

export default memo(ModalComment)
