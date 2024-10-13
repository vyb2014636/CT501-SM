import { Avatar, ListItemAvatar, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactCard = ({ user, selectedUserId, setSelectedUserId }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    setSelectedUserId(user._id)
    navigate(`/chat/${user._id}`)
  }

  return (
    <MenuItem
      sx={{ borderRadius: 2 }}
      onClick={handleClick}
      selected={selectedUserId === user._id} // So sánh với selectedUserId
    >
      <ListItemAvatar>
        <Avatar alt={user.lastname} src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user?.fullname} secondary={`@${user.firstname}`} />
    </MenuItem>
  )
}

export default ContactCard
