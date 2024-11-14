import FlexCenter from '@/components/Common/Flex/FlexCenter'
import LeftSection from '@/components/Common/Section/LeftSection'
import { styleBoxFlexAuth, styleForm } from '@/styles/styleAuth/style'
import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden', display: 'flex' }}>
      <FlexCenter sx={{ height: '70%', m: 'auto', width: { sx: '90%', md: '60%' } }}>
        <Box sx={styleBoxFlexAuth}>
          <LeftSection />
          <Box flex={2} width={1}>
            <Outlet />
          </Box>
        </Box>
      </FlexCenter>
    </Container>
  )
}

export default Auth
