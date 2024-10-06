import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost } from '@/features/post/postThunk'
import SharePostCard from './TypePostCard/SharePostCard'
import CommonPostCard from './TypePostCard/CommonPostCard'

const CardPost = ({ post }) => {
  const { user } = useSelector((state) => state.auth)
  const isLiked = post.likes?.includes(user._id)
  const dispatch = useDispatch()

  const handleClickLike = useCallback(() => {
    dispatch(toggleLikePost(post._id))
  }, [dispatch, post._id])

  return (
    <>
      {post.sharedPost ? (
        <SharePostCard post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      ) : (
        <CommonPostCard post={post} isLiked={isLiked} handleClickLike={handleClickLike} />
      )}
    </>
  )
}

export default memo(CardPost)
