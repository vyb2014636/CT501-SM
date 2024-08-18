import React from 'react'
import NavIcons from '@/components/NavIcons/NavIcons'
import Box from '@mui/material/Box'
import ContactCard from '@/components/ContactCard/ContactCard'

const RightSide = () => {
  return (
    <Box
      sx={{
        width: 400,
        p: 2,
        display: { xs: 'none', lg: 'block' },
        position: 'sticky',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
      <NavIcons />
      <ContactCard />
    </Box>
  )
}

export default RightSide
