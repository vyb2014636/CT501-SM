import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import { checkFriendshipStatus, resetFriendship } from '@/features/request/friendshipSlice'
import PersonalFeed from '@/components/Common/Main/PersonalFeed'
import { Box } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import { toast } from 'react-toastify'
import ProfileSkeleton from '@/components/Common/Skeleton/ProfileSkeleton'

const UserPersonal = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { totalPosts, posts, userPosts } = useSelector((state) => state.post)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(resetPostState()),
          dispatch(resetFriendship()),
          dispatch(fetchAllPosts({ page: 1, userId })),
          dispatch(checkFriendshipStatus(userId))
        ])
      } catch (error) {
        toast.error(error.message)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, userId])

  // Kiểm tra lỗi
  if (error) return <NotFoundPage />

  // Kiểm tra loading
  if ((loading && totalPosts === 0) || !userPosts) return <ProfileSkeleton />

  return <PersonalFeed user={userPosts} posts={posts} totalPosts={totalPosts} />
}

export default UserPersonal
