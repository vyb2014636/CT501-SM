import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { listPostsAPI } from '@/apis/post/postsAPI'
import ListPosts from '@/components/List/ListPosts/ListPosts'
import CardShare from '@/components/Card/CardShare/CardShare'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import SkeletonPost from '@/components/Skeleton/SkeletonPost'

const Main = () => {
  // const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { posts, status } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(fetchAllPosts())
    setLoading(false)
  }, [dispatch])

  return (
    <Box my={2}>
      {/* {status === 'loading' || (posts?.length === 0 && <SkeletonPost />)} */}
      <CardShare />
      {loading ? <SkeletonPost /> : <ListPosts posts={posts} />}
    </Box>
  )
}

export default Main
