import React, { useCallback, useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import SkeletonPost from '@/components/Skeleton/SkeletonPost'
import CardShare from '@/components/Card/CardShare'
import { Button, Typography } from '@mui/material'
import Post from '@/components/Common/Post/Post'
import { scrollbarStyleMui } from '@/styles/styles'
import { resetPostState } from '@/features/post/postSlice'

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [newPosts, setNewPosts] = useState([])
  const pageRef = useRef(1)
  const scrollBoxAllRef = useRef(null)
  const prevScrollTop = useRef(0)
  const dispatch = useDispatch()
  const { posts, totalPosts, status } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllPosts(pageRef.current)) // Gọi fetch cho trang đầu tiên
    setLoading(false)
  }, [dispatch])

  const handleScroll = useCallback(() => {
    const scrollBoxAll = scrollBoxAllRef.current

    if (scrollBoxAll && scrollBoxAll.scrollTop + scrollBoxAll.clientHeight >= scrollBoxAll.scrollHeight && posts.length < totalPosts) {
      setLoading(true)

      prevScrollTop.current = scrollBoxAll.scrollTop
      pageRef.current += 1

      dispatch(fetchAllPosts(pageRef.current)).then(() => {
        setLoading(false)
        scrollBoxAll.scrollTop = prevScrollTop.current
      })
    }
  }, [dispatch, posts.length, totalPosts])

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

  // Hàm này sẽ được gọi khi có bài đăng mới qua WebSocket (hoặc một cách nào khác)
  const handleNewPost = (newPost) => {
    setNewPosts((prevNewPosts) => [...prevNewPosts, newPost])
  }

  // Hàm để reload và thêm bài đăng mới vào listPost
  const handleReload = () => {
    setNewPosts([]) // Xóa danh sách bài mới sau khi reload
  }

  return (
    <Box sx={{ flex: 1, py: 2, px: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollBoxAllRef}>
      {/* Nếu có bài đăng mới, hiển thị nút "Reload" */}
      {newPosts.length > 0 && (
        <Box textAlign='center' my={2}>
          <Button variant='contained' color='primary' onClick={handleReload}>
            Reload {newPosts.length} new posts
          </Button>
        </Box>
      )}
      <CardShare />
      {loading && <SkeletonPost />}
      {posts.length === 0 ? (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Không có bài viết nào được đăng
        </Typography>
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
      {posts.length !== 0 && (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Đã hết bài viết
        </Typography>
      )}
    </Box>
  )
}

export default Main
