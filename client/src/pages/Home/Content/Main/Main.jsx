import CardShare from '@/components/Card/CardShare'
import ListPosts from '@/components/Common/List/ListPosts'
import SkeletonPosts from '@/components/Skeleton/SkeletonPosts'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

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

  return loading && posts.length === 0 ? (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {[...Array(3)].map((_, i) => (
        <SkeletonPosts key={i} />
      ))}
    </Box>
  ) : (
    <ListPosts pageRef={pageRef}>
      <CardShare user={user} />
    </ListPosts>
  )
}

export default Main
