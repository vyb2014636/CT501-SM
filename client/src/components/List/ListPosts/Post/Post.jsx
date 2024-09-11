import React, { memo } from 'react'
import PostShare from './PostShare/PostShare'
import PostCommon from './PostCommon/PostCommon'

const Post = ({ post }) => {
  return <>{post.sharedPost ? <PostShare post={post} /> : <PostCommon post={post} />}</>
}

export default memo(Post)
