import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import LayoutMain from '@/components/Common/Main/LayoutMain'
import PostBox from '@/components/Post/PostBox'

const Main = () => {
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { user } = useSelector((state) => state.auth)
  const { posts, loading } = useSelector((state) => state.post)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.refresh) pageRef.current = 1
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current }))
  }, [dispatch, location.state])

  return (
    <LayoutMain loading={loading} posts={posts} pageRef={pageRef}>
      <PostBox user={user} />
    </LayoutMain>
  )
}

export default Main
