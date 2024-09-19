import FlexCenter from '@/components/Flex/FlexCenter'
import LeftSection from '@/components/Section/LeftSection'
import { styleBoxFlexAuth, styleForm } from '@/styles/styleAuth/style'
import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden', display: 'flex' }}>
      <FlexCenter sx={{ height: '50%', padding: 2, m: 'auto' }}>
        <Box sx={styleBoxFlexAuth}>
          <LeftSection />

          <Outlet />
        </Box>
      </FlexCenter>
    </Container>
  )
}

export default Auth
