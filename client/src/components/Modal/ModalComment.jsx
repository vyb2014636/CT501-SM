import { styleThreeButton } from '@/styles/stylePost/style'
import { Avatar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, Modal, TextField, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SendIcon from '@mui/icons-material/Send'
import React, { memo, useEffect, useState } from 'react'
import { CommentItem } from '../Common/Comment/CommentItem'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import FlexRow from '../Flex/FlexRow'
import FlexColumn from '../Flex/FlexColumn'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, fetchComments } from '@/features/comment/commentThunk'
import { resetCommentState } from '@/features/comment/commentSlice'

const ModalComment = ({ post }) => {
  const [open, setOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
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

  // useEffect(() => {
  //   console.log(comments)
  // }, [comments])

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
          <Typography align='center' fontWeight={900} variant='h6' marginBottom={2} padding={0}>
            Bình luận
          </Typography>
          <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }}>
            {comments?.map((comment) => (
              <CommentItem key={comment._id} post={post} comment={comment} user={comment.user} dispatch={dispatch} replies={comment.replies} />
            ))}
          </Box>
          <Divider />
          <FlexRow mt='auto' p={4}>
            <Avatar alt='Your Name' src={user.avatar} />
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
        </FlexColumn>
      </Modal>
    </>
  )
}

export default memo(ModalComment)
