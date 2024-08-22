import React from 'react'
import Box from '@mui/material/Box'
import ListContact from '@/pages/Home/RightSide/ListContacts/ListContacts'
import RightBar from './RightBar/RightBar'

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
      <RightBar />
      <ListContact />
    </Box>
  )
}

export default RightSide
