import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import NotFoundPage from '@/pages/Error/NotFoundPage'
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
      await Promise.all([dispatch(resetPostState()), dispatch(fetchAllPosts({ page: 1 }))])
    } catch (error) {
      console.log(error.message)
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
