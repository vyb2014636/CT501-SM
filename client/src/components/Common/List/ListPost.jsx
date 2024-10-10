import React, { memo, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import SkeletonPosts from '../Skeleton/SkeletonPosts'
import PostCard from '../PostCard/PostCard'
import PostCreation from '@/components/PostCreation/Card/PostCreation'
import ProfileCard from '../ProfileCard/ProfileCard'

const ListPost = ({ userId = null, pageRef, showProfileCard, currentUser }) => {
  const { posts, totalPosts, status, loading, hasMorePosts, userPosts } = useSelector((state) => state.post)
  const scrollPostsRef = useRef(null)
  const dispatch = useDispatch()
  const loadMorePosts = () => {
    if (hasMorePosts && !loading) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId }))
    }
  }
  useScrollInfinite(scrollPostsRef, loadMorePosts, hasMorePosts)
  return (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollPostsRef}>
      {showProfileCard && currentUser ? (
        <ProfileCard user={userPosts} totalPosts={totalPosts} myCardProfile />
      ) : showProfileCard ? (
        <ProfileCard user={userPosts} totalPosts={totalPosts} />
      ) : (
        <PostCreation />
      )}

      {!loading && posts.length === 0 ? (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Không có bài viết nào được đăng
        </Typography>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {loading && posts.length > 0 && <SkeletonPosts />}

          {!loading && posts.length !== 0 && posts.length >= totalPosts && (
            <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
              Đã hết bài viết
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}

export default memo(ListPost)
