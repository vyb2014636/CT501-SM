import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import { Box } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { toast } from 'react-toastify'
import ProfileSkeleton from '@/components/Common/Skeleton/ProfileSkeleton'
import PersonalFeed from '@/components/Common/Main/PersonalFeed'
import PostCreationSkeleton from '@/components/Common/Skeleton/PostCreationSkeleton'

const MyPersonal = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { totalPosts, posts } = useSelector((state) => state.post)
  const currentUser = useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(resetPostState()), dispatch(fetchAllPosts({ page: 1, userId: currentUser._id }))])
      } catch (error) {
        toast.error(error.message)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch])

  // Kiểm tra lỗi
  if (error) return <NotFoundPage />

  // Kiểm tra loading
  if ((loading && totalPosts === 0) || !currentUser) {
    return (
      <Box sx={{ flex: 3, p: 4, mx: 4 }}>
        <ProfileSkeleton>
          <PostCreationSkeleton />
        </ProfileSkeleton>
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonPosts key={i} />
        ))}
      </Box>
    )
  }

  return <PersonalFeed user={currentUser} posts={posts} totalPosts={totalPosts} currentUser />
}

export default MyPersonal
