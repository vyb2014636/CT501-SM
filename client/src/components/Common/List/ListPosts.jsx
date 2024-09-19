import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import SkeletonPosts from '@/components/Skeleton/SkeletonPosts'
import { Box, Button, Typography } from '@mui/material'
import { scrollbarStyleMui } from '@/styles/styles'
import CardShare from '@/components/Card/CardShare'
import { resetPostState } from '@/features/post/postSlice'
import { Navigate } from 'react-router-dom'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import CardProfile from '@/components/Card/CardProfile'

const ListPosts = ({ userId = null }) => {
  const [newPosts, setNewPosts] = useState([])
  const dispatch = useDispatch()
  const pageRef = useRef(1)
  const scrollBoxAllRef = useRef(null)
  const prevScrollTop = useRef(0)
  const { posts, totalPosts, status, userPosts, loading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts({ page: pageRef.current, userId: userId }))
  }, [dispatch, userId])

  const handleScroll = useCallback(() => {
    const scrollBoxAll = scrollBoxAllRef.current
    if (scrollBoxAll && scrollBoxAll.scrollTop + scrollBoxAll.clientHeight + 1 >= scrollBoxAll.scrollHeight && posts.length < totalPosts) {
      prevScrollTop.current = scrollBoxAll.scrollTop
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId: userId }))
      scrollBoxAll.scrollTop = prevScrollTop.current
    }
  }, [dispatch, posts?.length, totalPosts, userId])

  useEffect(() => {
    const scrollBox = scrollBoxAllRef.current
    if (scrollBox) {
      scrollBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollBox) {
        scrollBox.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  const handleNewPost = (newPost) => {
    setNewPosts((prevNewPosts) => [...prevNewPosts, newPost])
  }

  const handleReload = () => {
    setNewPosts([])
  }

  if (userId && status === 'failed') {
    return <NotFoundPage />
  }

  return (
    <Box sx={{ flex: 1, px: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollBoxAllRef}>
      {newPosts.length > 0 && (
        <Box textAlign='center' my={2}>
          <Button variant='contained' color='primary' onClick={handleReload}>
            Reload {newPosts.length} new posts
          </Button>
        </Box>
      )}
      {loading && <SkeletonPosts />}
      {/* Chỉ render CardProfile khi userPosts đã có dữ liệu hợp lệ */}
      {userId && userPosts && Object.keys(userPosts).length > 0 && <CardProfile user={userPosts} totalPosts={totalPosts} />}
      {((userId === user?._id && userId) || !userId) && <CardShare />}
      {posts.length === 0 && !loading ? (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Không có bài viết nào được đăng
        </Typography>
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
      {posts.length !== 0 && !loading && (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Đã hết bài viết
        </Typography>
      )}
    </Box>
  )
}

export default memo(ListPosts)
