import React, { useEffect, useState } from 'react'
import { scrollbarStyleMui } from '@/styles/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getPostsTrashAPI } from '@/apis/post/postsAPI'
import PostCard from '@/components/Common/PostCard/PostCard'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'

const Trash = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setErrror] = useState(false)
  const fetchTrashPosts = async () => {
    try {
      setLoading(true)
      const response = await getPostsTrashAPI()
      console.log(response)
      setPosts(response.posts)
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
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {loading ? (
        <SkeletonPosts />
      ) : !loading && posts?.length === 0 ? (
        <Typography>Không tồn tại bài đăng trong 30 ngày</Typography>
      ) : (
        posts.map((post) => <PostCard post={post} />)
      )}
    </Box>
  )
}

export default Trash
