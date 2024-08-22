import React from 'react'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const ContactCard = ({ contacts, contact, index }) => {
  return (
    <React.Fragment key={index}>
      <ListItem
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'background.default' // Màu nền khi hover
          }
        }}>
        <ListItemAvatar>
          <Avatar alt={contact.name} src={contact.imgSrc} />
        </ListItemAvatar>
        <ListItemText primary={contact.name} />
      </ListItem>
      {index < contacts.length - 1 && <Divider />}
    </React.Fragment>
  )
}

export default ContactCard
