import React, { useState } from 'react'
import img from '@/assets/postPic1.jpg'
import { Avatar, Box } from '@mui/material'

const OtherAvartarBackground = ({ user }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url('${img}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50%',
        borderRadius: '12px 12px 0 0',
        position: 'relative'
      }}>
      <Avatar
        src={user?.avatar}
        sx={{
          width: 80,
          height: 80,
          border: '2px solid',
          borderColor: 'background.paper',
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
    </Box>
  )
}

export default OtherAvartarBackground
