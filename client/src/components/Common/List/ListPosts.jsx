import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Post from '../Post/Post'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui } from '@/styles/styles'

const ListPosts = ({ userId = null, children }) => {
  const { posts, totalPosts, status, userPosts, loading } = useSelector((state) => state.post)
  const [newPosts, setNewPosts] = useState([])
  const pageRef = useRef(1)
  const scrollBoxRef = useRef(null)
  const dispatch = useDispatch()

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

      {children}
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
    </Box>
  )
}

export default memo(ListPosts)
