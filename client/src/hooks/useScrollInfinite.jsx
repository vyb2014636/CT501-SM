import { useEffect } from 'react'

const useScrollInfinite = (ref, loadMore, hasMore) => {
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      if (scrollTop + clientHeight + 2 >= scrollHeight && hasMore) {
        loadMore()
      }
    }
  }
  useEffect(() => {
    handleScroll()

    const scrollContainer = ref.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [ref, loadMore, hasMore])
}

export default useScrollInfinite
