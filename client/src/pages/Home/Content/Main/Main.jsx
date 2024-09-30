import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '@/components/Common/Card/PostCard'
import PostList from '@/components/Common/List/PostList'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box } from '@mui/material'

const Main = () => {
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { user } = useSelector((state) => state.auth)
  const { posts, loading } = useSelector((state) => state.post)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.refresh) pageRef.current = 1
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current }))
  }, [dispatch, location.state])

  return loading && posts?.length === 0 ? (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {[...Array(3)].map((_, i) => (
        <SkeletonPosts key={i} />
      ))}
    </Box>
  ) : (
    <PostList pageRef={pageRef}>
      <PostCard user={user} />
    </PostList>
  )
}

export default Main
