import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfileCard from '@/components/user/Card/ProfileCard'
import PostCard from '@/components/Common/Card/PostCard'
import LayoutMain from '@/components/Common/Main/LayoutMain'
import NotFoundPage from '@/pages/Error/NotFoundPage'

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

  return (
    <LayoutMain loading={loading} posts={posts} pageRef={pageRef}>
      <ProfileCard user={userPosts} totalPosts={totalPosts} myCardProfile />
      <PostCard user={userPosts} />
    </LayoutMain>
  )
}

export default Person
