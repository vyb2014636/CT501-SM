import React, { memo, useEffect } from 'react'
import PostShare from './PostShare/PostShare'
import PostCommon from './PostCommon/PostCommon'
import { useSelector } from 'react-redux'

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth)
  const isLiked = post.likes.includes(user._id)

  return <>{post.sharedPost ? <PostShare post={post} isLiked={isLiked} /> : <PostCommon post={post} isLiked={isLiked} />}</>
}

export default Post
