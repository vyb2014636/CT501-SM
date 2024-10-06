import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LayoutMain from '@/components/Common/Main/LayoutMain'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import ProfileCard from '@/components/Common/ProfileCard/ProfileCard'

const Other = () => {
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
      <ProfileCard user={userPosts} totalPosts={totalPosts} />
    </LayoutMain>
  )
}

export default Other
