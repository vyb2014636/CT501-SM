import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { listPostsAPI } from '@/apis/post/postsAPI'
import ListPosts from '@/components/List/ListPosts/ListPosts'
import CardShare from '@/components/Card/CardShare/CardShare'

const Main = () => {
  const [posts, setPosts] = useState([])
  const fetchListPosts = async () => {
    const response = await listPostsAPI()
    if (response) setPosts(response.post)
  }
  useEffect(() => {
    fetchListPosts()
  }, [])
  return (
    <Box my={2}>
      <CardShare />
      <ListPosts posts={posts} />
    </Box>
  )
}

export default Main
