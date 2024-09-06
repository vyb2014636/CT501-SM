import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Post from '@/pages/Home/Content/Main/ListPosts/Post/Post'
import { listPostsAPI } from '@/apis/postsAPI'

const ListPosts = ({ posts }) => {
  return <Box my={2}>{posts && posts.map((post) => (post?.images?.length > 0 ? <Post key={post._id} post={post} /> : <Post key={post._id} post={post} noMedia />))}</Box>
}

export default ListPosts
