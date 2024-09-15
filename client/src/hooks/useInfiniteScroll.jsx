import { useState, useRef } from 'react'

const useInfiniteScroll = (fetchData, posts, totalPosts) => {
  const scrollBoxRef = useRef(null)
  const prevScrollHeight = useRef(0)
  const pageRef = useRef(1)
  const [loading, setLoading] = useState(false)

  const handleScroll = () => {
    const scrollBox = scrollBoxRef.current
    if (!scrollBox || loading) return

    const reachedBottom = scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 500

    if (reachedBottom && posts.length < totalPosts) {
      prevScrollHeight.current = scrollBox.scrollHeight
      setLoading(true)
      fetchData(pageRef.current + 1).finally(() => {
        const newHeightDiff = scrollBox.scrollHeight - prevScrollHeight.current
        scrollBox.scrollTop += newHeightDiff
        setLoading(false)
        pageRef.current += 1
      })
    }
  }

  return { scrollBoxRef, handleScroll, loading }
}

export default useInfiniteScroll
