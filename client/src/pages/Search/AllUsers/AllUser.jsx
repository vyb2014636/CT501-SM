import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBox from '@/components/Search/Box/SearchBox'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import { fetchAllSearchAPI } from '@/apis/user/userAPI'

const AllUser = () => {
  const { query } = useParams()
  const [usersSearch, setUsersSearch] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchAllSearch = async () => {
    try {
      const response = await fetchAllSearchAPI(query)
      setUsersSearch(response.users)
    } catch (error) {
      console.error('Error fetching search users', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllSearch()
  }, [query])

  if (loading || usersSearch.length === 0)
    return (
      <Box sx={{ ...styleMain, ...scrollbarStyleMui }}>
        <Typography>loading....</Typography>
      </Box>
    )

  if (error) return <Typography>Không thể tải</Typography>

  return (
    <Box sx={{ ...styleMain, ...scrollbarStyleMui }}>
      {!loading && usersSearch?.length === 0 ? (
        <Typography>Không tìm thấy</Typography>
      ) : (
        <>
          <SearchBox usersSearch={usersSearch} />
        </>
      )}
    </Box>
  )
}

export default AllUser
