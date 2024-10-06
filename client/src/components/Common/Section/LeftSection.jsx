import { Box, Typography } from '@mui/material'
import React from 'react'
import Logo from '../LeftSide/LeftBar/Logo'

const LeftSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        padding: { xs: 3, md: 4 },
        width: { xs: '100%', md: '50%' },
        textAlign: { xs: 'center', md: 'left' }
      }}>
      <Logo />
      <Typography color='textSecondary' mt={1}>
        Khám phá những ý tưởng trên khắp thế giới.
      </Typography>
    </Box>
  )
}

export default LeftSection
