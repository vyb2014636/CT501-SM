import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Followers } from '@/data/follower'
import FollowerCard from './FollowerCard/FollowerCard'

const ListFollowers = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '18px',
        p: 3,
        mt: '15px'
      }}>
      <Typography variant='h7' gutterBottom color='primary' fontWeight='bold'>
        Những người bạn có thể biết
      </Typography>
      {Followers.map((follower, id) => (
        <FollowerCard follower={follower} id={id} />
      ))}
    </Box>
  )
}

export default ListFollowers
