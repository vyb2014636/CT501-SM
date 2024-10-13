import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import PostCreation from '@/components/PostCreation/Card/PostCreation'
import { fetchListNotificationAPI } from '@/features/notification/notificationThunk'
import { resetNotificationState } from '@/features/notification/notificationSlice'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import PostList from '@/components/Common/Main/PersonalFeed'
import { Box } from '@mui/material'
import PostCreationSkeleton from '@/components/Common/Skeleton/PostCreationSkeleton'
import { scrollbarStyleMui } from '@/styles/styles'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import MainFeed from '@/components/Common/Main/MainFeed'
import PostsSkeleton from '@/components/Common/Skeleton/PostsSkeleton'

const Main = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { totalPosts, posts } = useSelector((state) => state.post)

  const fetchData = async () => {
    try {
      await Promise.all([
        dispatch(resetPostState()),
        dispatch(resetNotificationState()),
        dispatch(fetchListNotificationAPI({ page: 1 })), //Chừng nào có thông báo mới ,mới gọi
        dispatch(fetchAllPosts({ page: 1 }))
      ])
    } catch (error) {
      toast.error(error.message)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dispatch, location.state])

  if (error) return <NotFoundPage />

  if (loading && totalPosts === 0) return <PostsSkeleton />

  return <MainFeed posts={posts} totalPosts={totalPosts} />
}

export default Main
