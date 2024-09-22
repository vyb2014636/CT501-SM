import CardShare from '@/components/Card/CardShare'
import ListPosts from '@/components/Common/List/ListPosts'
import SkeletonPosts from '@/components/Skeleton/SkeletonPosts'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Main = () => {
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { user } = useSelector((state) => state.auth)
  const { posts, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current }))
  }, [dispatch])

  return loading && posts.length === 0 ? (
    [...Array(3)].map((_, i) => <SkeletonPosts key={i} />)
  ) : (
    <ListPosts>
      <CardShare user={user} />
    </ListPosts>
  )
}

export default Main
