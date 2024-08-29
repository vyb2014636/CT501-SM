import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Post from '@/pages/Home/Content/Main/ListPosts/Post/Post'
import { listPostsAPI } from '@/apis/postsAPI'

const ListPosts = () => {
  useEffect(() => {
    listPostsAPI().then((response) => {
      console.log(response)
    })
  }, [])

  return (
    <Box my={2}>
      <Post />
      <Post noMedia />
      <Post />
    </Box>
  )
}

export default ListPosts
