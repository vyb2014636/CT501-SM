import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CardProfile from '@/components/Card/CardProfile'
import LeftSide from '@/components/Side/LeftSide'
import RightSide from '@/components/Side/RightSide'
import Post from '@/components/Common/Post/Post'
import { scrollbarStyleMui } from '@/styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUserPosts } from '@/features/post/postThunk'
import { resetPostState } from '@/features/post/postSlice'
import CardShare from '@/components/Card/CardShare'
import SkeletonPost from '@/components/Skeleton/SkeletonPost'

const Profile = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')
  const { userId } = useParams()
  const [loading, setLoading] = useState(true)
  const [newPosts, setNewPosts] = useState([])
  const pageRef = useRef(1)
  const scrollBoxRef = useRef(null)
  const prevScrollTop = useRef(0)
  const dispatch = useDispatch()
  const { posts, totalPosts, status, userPosts } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(resetPostState())
    dispatch(fetchAllUserPosts({ page: pageRef, userId: userId }))
    setLoading(false)
  }, [dispatch])

  const handleScroll = useCallback(() => {
    const scrollBox = scrollBoxRef.current
    if (scrollBox && scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight && posts.length < totalPosts) {
      setLoading(true)

      prevScrollTop.current = scrollBox.scrollTop
      pageRef.current += 1

      dispatch(fetchAllUserPosts({ page: pageRef.current, userId: userId })).then(() => {
        setLoading(false)
        scrollBox.scrollTop = prevScrollTop.current
      })
    }
  }, [dispatch, posts.length, totalPosts])

  useEffect(() => {
    const scrollBox = scrollBoxRef.current
    if (scrollBox) {
      scrollBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollBox) {
        scrollBox.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Box sx={{ flex: 1, py: 2, px: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollBoxRef}>
          <CardProfile user={userPosts || user} totalPosts={totalPosts} />
          {userId === user._id && <CardShare />}
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
        <RightSide />
      </Box>
    </Container>
  )
}

export default Profile
