import StyledAvatar from '@/components/Common/AvatarStatus/StyledAvatar'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { Avatar, ListItemAvatar, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactCard = ({ user }) => {
  const navigate = useNavigate()

  const handleProfileClick = useProfileNavigation()

  return (
    <MenuItem sx={{ borderRadius: 2 }} onClick={() => handleProfileClick(user._id)}>
      <ListItemAvatar>
        {/* <Avatar alt={user.lastname} src={user.avatar} /> */}
        <StyledAvatar user={user} />
      </ListItemAvatar>
      <ListItemText primary={user?.fullname} secondary={`@${user.firstname}`} />
    </MenuItem>
  )
}

export default ContactCard
