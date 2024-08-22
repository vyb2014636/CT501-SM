import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const FollowerCard = ({ follower, id }) => {
  return (
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
  )
}

export default FollowerCard
