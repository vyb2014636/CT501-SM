import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', overflow: 'hidden', display: 'flex' }}>
      <Outlet />
    </Container>
  )
}

export default Auth
