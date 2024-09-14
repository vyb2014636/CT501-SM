import React, { memo } from 'react'
import Post from '../Post/Post'

const ListPosts = ({ posts }) => {
  return posts?.map((post) => <Post key={post._id} post={post} />)
}

export default memo(ListPosts)
