import React, { memo, useCallback } from 'react'
import SharePost from './SharePost/SharePost'
import CommonPost from './CommonPost/CommonPost'
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
        <SharePost post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      ) : (
        <CommonPost post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      )}
    </>
  )
}

export default memo(Post)
