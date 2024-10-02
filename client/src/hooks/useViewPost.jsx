import { fectchPostAPI } from '@/apis/post/postsAPI'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const useViewPost = () => {
  const { postId } = useParams() // Lấy postId từ params
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPost = async () => {
    try {
      const response = await fectchPostAPI(postId)
      setPost(response.post)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const handleLike = async () => {
    try {
      const response = await likePost(postId)
      setPost((prevPost) => ({
        ...prevPost,
        likes: response.data.likes // Cập nhật số lượt thích mới
      }))
    } catch (err) {
      setError(err.message)
    }
  }

  return <div>useViewPost</div>
}

export default useViewPost
