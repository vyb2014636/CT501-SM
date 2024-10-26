import React, { useEffect, useRef, useState } from 'react'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { useDispatch, useSelector } from 'react-redux'
import MiniPostCard from '../Card/MiniPostCard'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import { resetPostState } from '@/features/post/postSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'

const MiniPostList = ({ user, onBack }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { posts, hasMorePosts } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const scrollPostsRef = useRef(null)
  const pageRef = useRef(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(resetPostState()), dispatch(fetchAllPosts({ page: 1, userId: user._id, limit: 5 }))])
      } catch (error) {
        toast.error(error.message)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch])

  const loadMorePosts = () => {
    if (hasMorePosts && !loading) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId: user._id, limit: 5 }))
    }
  }

  useScrollInfinite(scrollPostsRef, loadMorePosts, hasMorePosts)

  if (loading && posts.length === 0) return <Typography>...loading</Typography>

  if (error) return <Typography>Không có dữ liệu</Typography>

  return (
    <Box position='relative'>
      <IconButton
        onClick={onBack}
        sx={{ position: 'absolute', top: 16, left: 16 }} // Đặt vị trí absolute cho icon
      >
        <KeyboardBackspaceOutlinedIcon />
      </IconButton>
      <Typography variant='h5' fontWeight='bold' textAlign='center' color='primary' p={4}>
        Danh sách bài đăng
      </Typography>
      <FlexRow
        height={1}
        sx={{ ...scrollbarStyleMui, display: 'flex', flexWrap: 'wrap', gap: 2, p: 2, mt: 10, alignItems: 'stretch' }}
        ref={scrollPostsRef}>
        {posts.length > 0 ? posts.map((post) => <MiniPostCard key={post._id} post={post} />) : <Typography>Không có bài đăng nào</Typography>}
      </FlexRow>
    </Box>
  )
}

export default MiniPostList
