import ListPosts from '@/components/Common/List/PostList'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProfileCard from '@/components/user/Card/ProfileCard'
import PostCard from '@/components/Common/Card/PostCard'

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { userPosts, totalPosts, posts, loading } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
  }, [dispatch])

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
    <ListPosts userId={userId} pageRef={pageRef}>
      <ProfileCard user={userPosts} totalPosts={totalPosts} myCardProfile />
      <PostCard user={userPosts} />
    </ListPosts>
  )
}

export default Person
