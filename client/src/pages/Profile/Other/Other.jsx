import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import { checkFriendshipStatus, resetFriendship } from '@/features/request/friendshipSlice'
import PostList from '@/components/Common/List/ListPost'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { toast } from 'react-toastify'
import ProfileSkeleton from '@/components/Common/Skeleton/ProfileSkeleton'

const Other = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { error } = useSelector((state) => state.post)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(resetPostState()),
          dispatch(resetFriendship()),
          dispatch(fetchAllPosts({ page: pageRef.current, userId })),
          dispatch(checkFriendshipStatus(userId))
        ])
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, userId])

  // Kiểm tra lỗi
  if (error) return <NotFoundPage />

  // Kiểm tra loading
  if (loading) {
    return (
      <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
        <ProfileSkeleton />
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonPosts key={i} />
        ))}
      </Box>
    )
  }

  return <PostList pageRef={pageRef} showProfileCard />
}

export default Other
