import React, { useEffect, useState } from 'react'
import { scrollbarStyleMui } from '@/styles/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getPostsTrashAPI } from '@/apis/post/postsAPI'
import PostCard from '@/components/Common/PostCard/PostCard'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import TrashCard from './TrashCard/TrashCard'

const Trash = () => {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setErrror] = useState(false)
  const fetchTrashPosts = async () => {
    try {
      setLoading(true)
      const response = await getPostsTrashAPI()
      setDays(response.posts)
      setLoading(false)
    } catch (error) {
      setErrror(true)
      console.log(error.posts)
    }
  }

  useEffect(() => {
    fetchTrashPosts()
  }, [])
  return (
    <Box sx={{ p: 4, mx: 4, ...scrollbarStyleMui }}>
      <Typography variant='h4' fontWeight='bold' gutterBottom>
        Thùng rác
      </Typography>
      <Box>
        <Typography variant='caption' color='textSecondary'>
          Các bài viết sẽ được xóa trong 30 ngày
        </Typography>
      </Box>
      {loading ? (
        <SkeletonPosts />
      ) : !loading && days?.length === 0 ? (
        <Typography>Không tồn tại bài đăng trong 30 ngày</Typography>
      ) : (
        days.map((day) => <TrashCard day={day} key={day._id} setDays={setDays} />)
      )}
    </Box>
  )
}

export default Trash
