import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBox from '@/components/Search/Box/SearchBox'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import PostBox from '@/components/Search/Box/PostBox'
import { searchAPI } from '@/apis/user/userAPI'

const Summary = () => {
  const { query } = useParams()
  const [usersSearch, setUsersSearch] = useState([])
  const [postsSearch, setPostsSearch] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchSearchUser = async () => {
    try {
      const response = await searchAPI(query)
      setUsersSearch(response.users)
      setPostsSearch(response.posts)
      setHasMore(response.hasMoreUsers)
    } catch (error) {
      console.error('Error fetching search users', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSearchUser()
  }, [query])

  return (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {loading && usersSearch?.length === 0 ? (
        <Typography>loading....</Typography>
      ) : !loading && usersSearch?.length === 0 && postsSearch?.length === 0 ? (
        <Typography>Không tìm thấy</Typography>
      ) : (
        <>
          <SearchBox usersSearch={usersSearch} hasMore={hasMore} />
          <PostBox postsSearch={postsSearch} />
        </>
      )}
    </Box>
  )
}

export default Summary
