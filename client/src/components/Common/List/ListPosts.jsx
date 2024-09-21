import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import SkeletonPosts from '@/components/Skeleton/SkeletonPosts'
import { Box, Button, Typography } from '@mui/material'
import { scrollbarStyleMui } from '@/styles/styles'
import CardShare from '@/components/Card/CardShare'
import { resetPostState } from '@/features/post/postSlice'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import CardProfile from '@/components/Card/CardProfile'

const ListPosts = ({ userId = null }) => {
  const [newPosts, setNewPosts] = useState([])
  const pageRef = useRef(1)
  const scrollBoxRef = useRef(null)
  const { posts, totalPosts, status, userPosts, loading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId }))
  }, [dispatch, userId])

  const handleScroll = useCallback(() => {
    const scrollBox = scrollBoxRef.current
    if (scrollBox && scrollBox.scrollTop + scrollBox.clientHeight + 2 >= scrollBox.scrollHeight && posts.length < totalPosts) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId }))
    }
  }, [dispatch, posts.length, totalPosts, userId])

  useEffect(() => {
    const scrollBox = scrollBoxRef.current
    if (scrollBox) {
      scrollBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollBox) scrollBox.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleNewPost = (newPost) => setNewPosts((prev) => [...prev, newPost])

  const handleReload = () => setNewPosts([])

  if (userId && status === 'failed') return <NotFoundPage />

  return (
    <Box sx={{ flex: 1, p: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollBoxRef}>
      {newPosts.length > 0 && (
        <Box textAlign='center' my={2}>
          <Button variant='contained' color='primary' onClick={handleReload}>
            Reload {newPosts.length} new posts
          </Button>
        </Box>
      )}

      {loading && posts.length === 0 ? (
        [...Array(3)].map((_, i) => <SkeletonPosts key={i} />)
      ) : (
        <>
          {userId && userPosts && <CardProfile user={userPosts} totalPosts={totalPosts} />}
          {(userId === user?._id || !userId) && <CardShare user={userPosts || user} />}
          {!loading && posts.length === 0 && (
            <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
              Không có bài viết nào được đăng
            </Typography>
          )}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
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

export default memo(ListPosts)
