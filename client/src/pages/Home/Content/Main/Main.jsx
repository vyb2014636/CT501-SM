import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import PostCard from '@/components/Common/Card/PostCard'
import PostList from '@/components/Common/List/PostList'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import { scrollbarStyleMui } from '@/styles/styles'

const Main = () => {
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { user } = useSelector((state) => state.auth)
  const { posts, loading } = useSelector((state) => state.auth)
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
  ) : posts?.length === 0 ? (
    <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
      Không có bài viết nào được đăng
    </Typography>
  ) : (
    <PostList pageRef={pageRef}>
      <PostCard user={user} />
    </PostList>
  )
}

export default Main
