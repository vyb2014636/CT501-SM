import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import SearchCard from '@/components/Search/Card/SearchCard'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBox = ({ usersSearch, hasMore }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleViewAll = () => {
    navigate(`${location.pathname}/people`)
  }

  return (
    <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: 4 }}>
      <Typography variant='h5' fontWeight='bold'>
        Trang
      </Typography>
      {usersSearch?.length > 0 ? (
        usersSearch.map((user) => <SearchCard user={user} key={user._id} />)
      ) : (
        <Typography>Không tìm thấy người dùng</Typography>
      )}
      {hasMore && (
        <Button fullWidth variant='contained' onClick={handleViewAll}>
          Xem tất cả
        </Button>
      )}
    </Box>
  )
}

export default SearchBox
