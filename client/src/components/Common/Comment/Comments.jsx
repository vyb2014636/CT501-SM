import React from 'react'
import Comment from './Comment'

const Comments = ({ comments, dispatch, post }) => {
  return comments?.map((comment) => (
    <Comment key={comment._id} post={post} comment={comment} user={comment.user} dispatch={dispatch} replies={comment.replies} />
  ))
}

export default Comments
