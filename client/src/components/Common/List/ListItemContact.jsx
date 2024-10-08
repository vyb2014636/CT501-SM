import React from 'react'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { formatFullname } from '@/utils/helpers'

const ListItemContact = ({ contacts, contact, index }) => {
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

export default ListItemContact
