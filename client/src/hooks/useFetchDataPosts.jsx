import { resetPostState } from '@/features/post/postSlice'
import { useDispatch, useSelector } from 'react-redux'

const useFetchDataPosts = (fetchAction, userId = null) => {
  const dispatch = useDispatch()
  const { posts, totalPosts, userPosts } = useSelector((state) => state.post)

  const resetData = () => {
    dispatch(resetPostState())
  }
  const fetchData = (page) => {
    if (userId) {
      return dispatch(fetchAction({ page: page, userId: userId }))
    }
    return dispatch(fetchAction(page))
  }

  return { posts, totalPosts, fetchData, resetData, userPosts }
}

export default useFetchDataPosts
