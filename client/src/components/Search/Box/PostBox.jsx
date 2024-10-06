import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { resetPostState, searchPosts } from '@/features/post/postSlice'
import PostCard from '@/components/Common/PostCard/PostCard'

const PostBox = ({ postsSearch }) => {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(resetPostState())
    dispatch(searchPosts(postsSearch))
  }, [postsSearch])

  return posts?.length === 0 ? (
    <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
      Không có bài viết liên quan
    </Typography>
  ) : (
    <>
      <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
        Bài viết liên quan
      </Typography>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  )
}

export default PostBox
