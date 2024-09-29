import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'

const useInfiniteScrollPosts = (ref, userId, pageRef) => {
  const dispatch = useDispatch()
  const { posts, totalPosts } = useSelector((state) => state.post)

  const handleScroll = useCallback(() => {
    const scrollBox = ref.current
    if (scrollBox && scrollBox.scrollTop + scrollBox.clientHeight + 2 >= scrollBox.scrollHeight && posts.length < totalPosts) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId }))
    }
  }, [dispatch, posts.length, totalPosts, userId])

  useEffect(() => {
    const scrollBox = ref.current
    if (scrollBox) {
      scrollBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollBox) scrollBox.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
}

export default useInfiniteScrollPosts
