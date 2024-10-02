import { searchAPI } from '@/apis/user/userAPI'
import SearchList from '@/components/Common/List/SearchList'
import LeftSide from '@/components/Layout/LeftSide/LeftSide'
import RightSide from '@/components/Layout/RightSide/RightSide'
import { Box, Container, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

const Search = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 950px)')

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: isNonScreenMobile ? 'row' : 'column', height: '100vh' }}>
        <LeftSide />
        <Outlet />
        <RightSide />
      </Box>
    </Container>
  )
}

export default Search
