import React, { useEffect, useRef, useState } from 'react'
import { scrollbarStyleMui } from '@/styles/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SkeletonPosts from '@/components/Common/Skeleton/PostsSkeleton'
import { getFavoritesAPI } from '@/apis/user/userAPI'
import FavoriteCard from './FavoriteCard/FavoriteCard'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import CircularProgress from '@mui/material/CircularProgress'
import MenuMobile from '@/components/Mobile/MenuMobile'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [hasMoreFavorites, setHasMoreFavorites] = useState(true)
  const [totalFavorites, setTotalFavorites] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false) // Thêm trạng thái
  const [error, setErrror] = useState(false)
  const scrollRef = useRef(null)
  const pageRef = useRef(1)

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await getFavoritesAPI()
      setFavorites(response.favorites)
      setHasMoreFavorites(response.hasMoreFavorites)
      setTotalFavorites(response.totalFavorites)
      setLoading(false)
    } catch (error) {
      setErrror(true)
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const loadMoreFavorites = async () => {
    if (hasMoreFavorites && !isFetchingMore) {
      try {
        setIsFetchingMore(true)
        pageRef.current += 1
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const response = await getFavoritesAPI(pageRef.current)
        setFavorites((prev) => [...prev, ...response.favorites])
        setHasMoreFavorites(response.hasMoreFavorites)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsFetchingMore(false)
      }
    }
  }

  useScrollInfinite(scrollRef, loadMoreFavorites, hasMoreFavorites)

  return (
    <>
      <MenuMobile />
      <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }} ref={scrollRef}>
        <Typography variant='h5' fontWeight='bold' p={3}>
          Tất cả
        </Typography>
        {loading ? (
          <SkeletonPosts />
        ) : !loading && favorites?.length === 0 ? (
          <Typography>Không có danh sách yêu thích</Typography>
        ) : (
          <>
            {favorites.map((post) => (
              <FavoriteCard key={post._id} post={post} setFavorites={setFavorites} />
            ))}
            {isFetchingMore && ( // Hiển thị hiệu ứng tải khi đang tải thêm
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress size={30} />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default Favorites
