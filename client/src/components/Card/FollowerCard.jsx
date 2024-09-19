import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { formatFullname } from '@/utils/helpers'
import { useSelector } from 'react-redux'
import { getRequests, sendFriendAPI } from '@/apis/user/userAPI'

const FollowerCard = ({ follower, id }) => {
  const [existRequest, setExistRequest] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const fetchRequests = async () => {
    try {
      const response = await getRequests()
    } catch (error) {
      setExistRequest(true)
    }
  }
  return (
    <List sx={{ bgcolor: 'background.paper' }} key={id}>
      <ListItem>
        <ListItemAvatar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar alt={follower.lastname} src={follower.avatar} sx={{ height: 46, width: 46 }} />
        </ListItemAvatar>
        <ListItemText primary={formatFullname(follower.firstname, follower.lastname)} secondary={`@${follower.firstname}`} />
        <Button variant='contained' sx={{ borderRadius: 12 }}>
          Kết bạn
        </Button>
      </ListItem>
    </List>
  )
}

export default FollowerCard
