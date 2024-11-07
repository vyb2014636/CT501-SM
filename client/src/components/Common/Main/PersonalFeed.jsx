import React, { memo, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import SkeletonPosts from '../Skeleton/PostsSkeleton'
import PostCard from '../PostCard/PostCard'
import PostCreation from '@/components/PostCreation/Card/PostCreation'
import ProfileCard from '../ProfileCard/ProfileCard'
import NotFoundPage from '@/pages/Error/NotFoundPage'

const PersonalFeed = ({ posts, user, currentUser, totalPosts }) => {
  if (user?.isAdmin) return <NotFoundPage />

  const { loading, hasMorePosts } = useSelector((state) => state.post)
  const scrollPostsRef = useRef(null)
  const pageRef = useRef(1)
  const dispatch = useDispatch()
  const loadMorePosts = () => {
    if (hasMorePosts && !loading) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId: user._id }))
    }
  }
  useScrollInfinite(scrollPostsRef, loadMorePosts, hasMorePosts)
  return (
    <Box sx={{ ...styleMain, ...scrollbarStyleMui }} ref={scrollPostsRef}>
      {currentUser ? (
        <>
          <ProfileCard user={user} totalPosts={totalPosts} myCardProfile />
          <PostCreation />
        </>
      ) : (
        <ProfileCard user={user} totalPosts={totalPosts} />
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

export default memo(PersonalFeed)
