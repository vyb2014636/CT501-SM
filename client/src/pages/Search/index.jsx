import { searchAPI } from '@/apis/user/userAPI'
import LeftSide from '@/components/Common/LeftSide/LeftSide'
import SearchList from '@/components/Common/List/ListSearch'
import RightSide from '@/components/Common/RightSide/RightSide'
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
