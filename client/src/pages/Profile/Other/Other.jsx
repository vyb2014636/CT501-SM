import { checkFriendshipAPI } from '@/apis/user/userAPI'
import FriendshipButton from '@/components/AppBar/Button/FriendshipButton'
import CardProfile from '@/components/profile/Profile/Card/CardProfile'
import ListPosts from '@/components/Common/List/ListPosts'
import SkeletonPosts from '@/components/Common/Skeleton/SkeletonPosts'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import SkeletonProfile from '@/components/Common/Skeleton/SjeketonProfile'

const Other = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const { userPosts, totalPosts, posts, loading } = useSelector((state) => state.post)
  const [statusFriendship, setStatusFriendship] = useState('')
  const [requestId, setRequestId] = useState(null)

  const fetchFriendshipStatus = async () => {
    const response = await checkFriendshipAPI(userId)
    setStatusFriendship(response.status)
    if (response?.requestId) setRequestId(response.requestId)
    else setRequestId(null)
  }

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
  }, [dispatch])

  useEffect(() => {
    fetchFriendshipStatus()
  }, [])

  return loading && posts.length === 0 ? (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {[...Array(3)].map((_, i) => (
        <SkeletonPosts key={i} />
      ))}
    </Box>
  ) : (
    <ListPosts userId={userId} pageRef={pageRef}>
      <CardProfile user={userPosts} totalPosts={totalPosts}>
        <FriendshipButton statusFriendship={statusFriendship} requestId={requestId} user={userPosts} fetchFriendshipStatus={fetchFriendshipStatus} />
      </CardProfile>
    </ListPosts>
  )
}

export default Other
