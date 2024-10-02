import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBox from '@/components/Search/Box/SearchBox'
import { scrollbarStyleMui } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import { fetchAllSearchAPI } from '@/apis/user/userAPI'

const AllUser = () => {
  const { query } = useParams()
  const [usersSearch, setUsersSearch] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllSearch = async () => {
    try {
      const response = await fetchAllSearchAPI(query)
      setUsersSearch(response.users)
    } catch (error) {
      console.error('Error fetching search users', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAllSearch()
  }, [query])

  return (
    <Box sx={{ flex: 3, p: 4, mx: 4, ...scrollbarStyleMui }}>
      {loading && usersSearch?.length === 0 ? (
        <Typography>loading....</Typography>
      ) : !loading && usersSearch?.length === 0 ? (
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
