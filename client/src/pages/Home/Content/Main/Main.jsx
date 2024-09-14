import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import SkeletonPost from '@/components/Skeleton/SkeletonPost'
import ListPosts from '@/components/Common/List/ListPosts'
import CardShare from '@/components/Card/CardShare'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress } from '@mui/material'
import { incrementPage } from '@/features/post/postSlice'

const scrollStyle = {
  flex: 1,
  py: 2,
  px: 4,
  mx: 4,
  overflow: 'auto',
  '&::-webkit-scrollbar-thumb': { bgcolor: 'background.paper' },
  '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
  '&::-webkit-scrollbar': { width: 5 }
}

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [listPost, setListPost] = useState([]) // State cho danh sách bài đăng
  const [newPosts, setNewPosts] = useState([]) // State để lưu các bài đăng mới
  const dispatch = useDispatch()
  const { posts, page, totalPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(fetchAllPosts(page)) // Lấy dữ liệu trang đầu tiên khi component được mount
  }, [dispatch])

  // Lấy bài đăng khi component mount (chỉ gọi fetchPosts cho page 1)
  const fetchMoreData = () => {
    dispatch(incrementPage()) // Tăng số trang khi load thêm dữ liệu
    dispatch(fetchAllPosts(page + 1))
  }

  // Hàm này sẽ được gọi khi có bài đăng mới qua WebSocket (hoặc một cách nào khác)
  const handleNewPost = (newPost) => {
    setNewPosts((prevNewPosts) => [...prevNewPosts, newPost])
  }

  // Hàm để reload và thêm bài đăng mới vào listPost
  const handleReload = () => {
    setListPost((prevPosts) => [...newPosts, ...prevPosts]) // Thêm bài mới vào đầu danh sách
    setNewPosts([]) // Xóa danh sách bài mới sau khi reload
  }

  return (
    <Box sx={scrollStyle}>
      {/* Nếu có bài đăng mới, hiển thị nút "Reload" */}
      {newPosts.length > 0 && (
        <Box textAlign='center' my={2}>
          <Button variant='contained' color='primary' onClick={handleReload}>
            Reload {newPosts.length} new posts
          </Button>
        </Box>
      )}
      {loading && posts.length === 0 ? (
        <SkeletonPost />
      ) : (
        <InfiniteScroll
          dataLength={posts.length} // Đếm số bài hiện tại
          next={fetchMoreData} // Gọi fetchPosts khi người dùng scroll tới cuối
          hasMore={posts.length < totalPosts} // Chỉ tiếp tục scroll nếu còn bài đăng và không đang tải
          loader={<CircularProgress color='primary' />}
          endMessage={
            <Typography variant='body1' align='center'>
              Hết bài viết
            </Typography>
          }>
          <CardShare />
          <ListPosts posts={posts} />
        </InfiniteScroll>
      )}
    </Box>
  )
}

export default Main
