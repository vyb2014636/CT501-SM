import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBox from '@/components/Search/Box/SearchBox'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import PostBox from '@/components/Search/Box/PostBox'
import { searchAPI } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'
import { updateUser } from '@/features/auth/authSlice'
import { useDispatch } from 'react-redux'

const Summary = () => {
  const { query } = useParams()
  const [usersSearch, setUsersSearch] = useState([])
  const [postsSearch, setPostsSearch] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const fetchSearchUser = async () => {
    try {
      setLoading(true)
      const response = await searchAPI(query, 'saveHistory')
      setUsersSearch(response.users)
      setPostsSearch(response.posts)
      dispatch(updateUser(response.user))
      setHasMore(response.hasMoreUsers)
    } catch (error) {
      toast.error(error.message)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchUser()
  }, [query])

  if (loading || !usersSearch || !postsSearch)
    return (
      <Box sx={{ ...styleMain, ...scrollbarStyleMui }}>
        <Typography>loading....</Typography>
      </Box>
    )

  if (error) return <Typography>Không thể tải</Typography>

  return (
    <Box sx={{ ...styleMain, ...scrollbarStyleMui }}>
      {usersSearch?.length === 0 && postsSearch?.length === 0 ? (
        <Typography>Không tìm thấy kết quả cho : {query}</Typography>
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
