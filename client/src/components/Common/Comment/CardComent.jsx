import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite' //

import ReplyIcon from '@mui/icons-material/Reply'
import { useDispatch } from 'react-redux'
import { likeComment } from '@/features/comment/commentThunk'
import { formatFullname } from '@/utils/helpers'

const CardComment = ({ user, comment, handleReplyClick, postId, isLiked }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeComment({ postId, commentId: comment._id }))
  }

  return (
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
          <Button size='small' color='primary' onClick={handleLike}>
            {isLiked ? <FavoriteIcon fontSize='small' /> : <FavoriteBorderOutlinedIcon fontSize='small' />}
            <Typography variant='caption' ml={0.5}>
              {comment.likes.length} Thích
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
  )
}

export default CardComment
