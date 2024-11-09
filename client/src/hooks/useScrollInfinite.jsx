import { useEffect } from 'react'

const useScrollInfinite = (ref, loadMore, hasMore) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current
        console.log(scrollTop, scrollHeight, clientHeight)
        if (scrollTop + clientHeight + 10 >= scrollHeight - 2 && hasMore) {
          loadMore()
        }
      }
    }

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
