import React, { useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Post from './Post/Post'

const ListPosts = ({ posts }) => {
  const renderedPosts = useMemo(() => {
    return posts.map((post) =>
      post.images?.length > 0 || post.videos?.length > 0 ? <Post key={post._id} post={post} /> : <Post key={post._id} post={post} noMedia />
    )
  }, [posts]) // Chỉ tái tạo khi posts thay đổi
  return <Box my={2}>{renderedPosts}</Box>
}

export default ListPosts
