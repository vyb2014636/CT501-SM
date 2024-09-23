import CardProfile from '@/components/Card/CardProfile'
import CardShare from '@/components/Card/CardShare'
import ListPosts from '@/components/Common/List/ListPosts'
import SkeletonPosts from '@/components/Skeleton/SkeletonPosts'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { userPosts, totalPosts, posts, loading } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
  }, [dispatch])

  return loading && posts.length === 0 ? (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {[...Array(3)].map((_, i) => (
        <SkeletonPosts key={i} />
      ))}
    </Box>
  ) : (
    <ListPosts userId={userId} pageRef={pageRef}>
      <CardProfile user={userPosts} totalPosts={totalPosts} myCardProfile />
      <CardShare user={userPosts} />
    </ListPosts>
  )
}

export default Person
