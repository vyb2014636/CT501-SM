import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ContactCard = ({ user }) => {
  const navigate = useNavigate()

  return (
    <MenuItem sx={{ borderRadius: 2 }} onClick={() => navigate(`/personal/${user._id}`)}>
      <ListItemAvatar>
        <Avatar alt={user.lastname} src={user.avatar} sx={{ height: 46, width: 46 }} />
      </ListItemAvatar>
      <ListItemText primary={user?.fullname} secondary={`@${user.firstname}`} />
    </MenuItem>
  )
}

export default ContactCard
