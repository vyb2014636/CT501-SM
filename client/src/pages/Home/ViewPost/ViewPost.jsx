import PostCard from '@/components/Common/PostCard/PostCard'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import { resetPostState } from '@/features/post/postSlice'
import { fetchPost } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPost = () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { viewPost, loading } = useSelector((state) => state.post)
  useEffect(() => {
    try {
      dispatch(resetPostState())
      dispatch(fetchPost(postId))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, postId])
  return (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {loading && !viewPost ? (
        <SkeletonPosts />
      ) : !loading && !viewPost ? (
        <Typography>Không tồn tại bài đăng</Typography>
      ) : (
        <PostCard post={viewPost} />
      )}
    </Box>
  )
}

export default ViewPost
