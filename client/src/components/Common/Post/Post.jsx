import React, { memo, useCallback, useEffect } from 'react'
import PostShare from './PostShare/PostShare'
import PostCommon from './PostCommon/PostCommon'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost } from '@/features/post/postThunk'

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth)
  const isLiked = post.likes.includes(user._id)
  const dispatch = useDispatch()

  const handleClickLike = useCallback(() => {
    dispatch(toggleLikePost(post._id))
  }, [dispatch, post._id])

  return (
    <>
      {post.sharedPost ? (
        <PostShare post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      ) : (
        <PostCommon post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      )}
    </>
  )
}

export default Post
