import { addComment, fetchComments } from '@/apis/post/postsAPI'
import { useEffect, useState } from 'react'

const useComments = (postId) => {
  const [comments, setComments] = useState([])
  const [hasMoreComments, setHasMoreComments] = useState(true)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const loadComments = async () => {
    setLoading(true)
    try {
      const response = await fetchComments(postId, page)
      setComments([])
      setComments((prevComments) => [...prevComments, ...response.comments])
      setHasMoreComments(response.hasMoreComments)
    } catch (error) {
      console.error('Failed to fetch comments:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   loadComments()
  // }, [postId, page])

  const loadMoreComments = async () => {
    if (hasMoreComments && !loading) {
      setPage((prevPage) => prevPage + 1)
      const response = await fetchComments(postId, page + 1)
    }
  }

  const addNewComment = async (content) => {
    try {
      const newComment = await addComment(postId, content)
      setComments((prevComments) => [...prevComments, newComment])
    } catch (error) {
      console.error('Failed to add comment:', error.message)
    }
  }

  return { comments, hasMoreComments, loading, loadComments, loadMoreComments, addNewComment }
}

export default useComments
