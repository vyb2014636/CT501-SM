import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import PostCreation from '@/components/PostCreation/Card/PostCreation'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import PostList from '@/components/Common/List/ListPost'
import { Box } from '@mui/material'
import PostCreationSkeleton from '@/components/Common/Skeleton/PostCreationSkeleton'
import { scrollbarStyleMui } from '@/styles/styles'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'

const Main = () => {
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { user } = useSelector((state) => state.auth)
  const { posts, loading, error } = useSelector((state) => state.post)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.refresh) pageRef.current = 1
    dispatch(resetPostState())
    dispatch(resetNotificationState())
    dispatch(fetchListNotificationAPI({ page: 1 }))
    dispatch(fetchAllPosts({ page: pageRef.current }))
  }, [dispatch, location.state])

  if (error) return <NotFoundPage /> //Không có đường dẫn
  if (loading) {
    return (
      <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
        <PostCreationSkeleton />
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonPosts key={i} />
        ))}
      </Box>
    )
  }

  return <PostList pageRef={pageRef} />
}

export default Main
