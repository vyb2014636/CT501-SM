import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import ProfileCard from '@/components/Common/ProfileCard/ProfileCard'
import PostList from '@/components/Common/List/ListPost'
import { Box } from '@mui/material'
import { scrollbarStyleMui } from '@/styles/styles'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import PostCreation from '@/components/PostCreation/Card/PostCreation'

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)

  const { userPosts, totalPosts, posts, loading, status } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
  }, [dispatch])

  if (userId && status === 'failed') return <NotFoundPage />

  if (loading && posts.length === 0) {
    return (
      <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
        {Array.from({ length: 3 }, (_, i) => (
          <SkeletonPosts key={i} />
        ))}
      </Box>
    )
  } else {
    return (
      <PostList pageRef={pageRef}>
        <ProfileCard user={userPosts} totalPosts={totalPosts} myCardProfile />
        <PostCreation user={userPosts} />
      </PostList>
    )
  }
}

export default Person
