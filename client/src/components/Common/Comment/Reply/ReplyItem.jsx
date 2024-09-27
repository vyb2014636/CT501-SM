import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite' // Import thêm icon Favorite

import { formatFullname } from '@/utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { likeReply } from '@/features/comment/commentThunk'

const ReplyItem = ({ postId, commentId, user, reply }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.user)

  const isLiked = reply.likes?.includes(currentUser._id)

  const handleLikeReply = () => {
    dispatch(likeReply({ postId, commentId, replyId: reply._id }))
  }

  return (
    <Box display='flex' alignItems='flex-start' mt={1} ml={8} key={reply._id}>
      <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
      <Box ml={2}>
        <Box sx={{ backgroundColor: 'background.default', borderRadius: '18px', px: 4, py: 1 }}>
          <Typography variant='body1' fontWeight='bold' fontSize='small'>
            {formatFullname(user.firstname, user.lastname)}
          </Typography>
          <Typography variant='body2' fontSize='small'>
            {reply.content}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          <Button size='small' color='primary' onClick={handleLikeReply}>
            {isLiked ? <FavoriteIcon fontSize='small' /> : <FavoriteBorderOutlinedIcon fontSize='small' />}
            <Typography variant='caption' ml={0.5}>
              {reply.likes.length} Thích
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ReplyItem