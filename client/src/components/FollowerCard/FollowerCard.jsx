import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Followers } from '@/data/follower'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const FollowerCard = () => {
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
        <List sx={{ bgcolor: 'background.paper' }} key={id}>
          <ListItem>
            <ListItemAvatar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar alt={follower.name} src={follower.img} sx={{ height: 46, width: 46 }} />
            </ListItemAvatar>
            <ListItemText primary={follower.name} secondary={`@${follower.username}`} />
            <Button variant='contained' sx={{ borderRadius: 12 }}>
              Kết bạn
            </Button>
          </ListItem>
        </List>
      ))}
    </Box>
  )
}

export default FollowerCard
