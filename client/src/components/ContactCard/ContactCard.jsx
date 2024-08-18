import React from 'react'
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material'
import FlexBetween from '../Flex/FlexBetween'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const contacts = [
  { name: 'Nguyễn Văn A', imgSrc: '/path/to/image1.jpg' },
  { name: 'Trần Thị B', imgSrc: '/path/to/image2.jpg' }
]

const ContactCard = () => {
  return (
    <Box
      sx={{
        width: 400,
        p: 2,
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '12px'
      }}>
      <FlexBetween mx={2}>
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }} color='primary'>
          Người liên hệ
        </Typography>
        <SearchOutlinedIcon color='primary' />
      </FlexBetween>
      <List>
        {contacts.map((contact, index) => (
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
        ))}
      </List>
    </Box>
  )
}

export default ContactCard
