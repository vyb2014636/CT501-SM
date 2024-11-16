import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost } from '@/features/post/postThunk'
import SharePostCard from './TypePostCard/SharePostCard'
import CommonPostCard from './TypePostCard/CommonPostCard'

import { useLocation } from 'react-router-dom'

import ReplyWarningForm from '@/components/Warning/Form/ReplyWarningForm'

const CardPost = ({ post, visibleMenu }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const isLiked = post?.likes?.some((like) => like?._id.toString() === user?._id)

  const handleClickLike = useCallback(() => {
    dispatch(toggleLikePost(post._id))
  }, [dispatch, post._id])

  return (
    <>
      {post.sharedPost || post.sharedPost === null ? (
        <SharePostCard post={post} isLiked={isLiked} handleClickLike={handleClickLike} visibleMenu={visibleMenu} />
      ) : (
        <CommonPostCard post={post} isLiked={isLiked} handleClickLike={handleClickLike} visibleMenu={visibleMenu} />
      )}
      {post.status === 'hidden' && post.byPost._id.toString() === user._id.toString() && <ReplyWarningForm reportId={location?.state?.reportId} />}
    </>
  )
}

export default memo(CardPost)
