import React from 'react'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { formatFullname } from '@/utils/helpers'

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
          <Avatar alt={formatFullname(contact?.firstName, contact?.lastName) || 'name'} src={contact?.avatar} />
        </ListItemAvatar>
        <ListItemText primary={formatFullname(contact?.firstName, contact?.lastName)} />
      </ListItem>
      {index < contacts?.length - 1 && <Divider />}
    </React.Fragment>
  )
}

export default ContactCard
