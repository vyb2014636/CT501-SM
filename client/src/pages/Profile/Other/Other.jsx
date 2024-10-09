import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import ProfileCard from '@/components/Common/ProfileCard/ProfileCard'
import { checkFriendshipStatus, resetFriendship } from '@/features/request/friendshipSlice'
import PostList from '@/components/Common/List/ListPost'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box } from '@mui/material'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'

const Other = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { userPosts, totalPosts, posts, loading, error } = useSelector((state) => state.post)
  const { loadingFriendship } = useSelector((state) => state.friendship)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(resetFriendship())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
    dispatch(checkFriendshipStatus(userId))
  }, [dispatch, userId])

  if (userId && error) return <NotFoundPage /> //Không có đường dẫn

  if ((loading || loadingFriendship) && posts.length === 0) {
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
        <ProfileCard user={userPosts} totalPosts={totalPosts} />
      </PostList>
    )
  }
}

export default Other
