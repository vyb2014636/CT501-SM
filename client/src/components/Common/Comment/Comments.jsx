import { scrollbarStyles } from '@/styles/styles'
import { Box } from '@mui/material'
import React from 'react'
import { Comment } from './Comment'

const Comments = ({ comments, dispatch, post }) => {
  return (
    <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }}>
      {comments?.map((comment) => (
        <Comment key={comment._id} post={post} comment={comment} user={comment.user} dispatch={dispatch} replies={comment.replies} />
      ))}
    </Box>
  )
}

export default Comments
