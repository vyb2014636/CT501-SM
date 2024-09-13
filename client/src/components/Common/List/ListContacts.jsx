import React from 'react'
import FlexBetween from '@components/Flex/FlexBetween'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ContactCard from '../../Card/ContactCard'
import { useSelector } from 'react-redux'

// const contacts = [
//   { name: 'Nguyễn Văn A', imgSrc: '/path/to/image1.jpg' },
//   { name: 'Trần Thị B', imgSrc: '/path/to/image2.jpg' }
// ]

const ListContacts = () => {
  const { user } = useSelector((state) => state.auth)
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
        {/* {user?.friends && user.friends?.map((contact, index) => <ContactCard contacts={user?.friends} contact={contact} index={index} key={index} />)} */}
      </List>
    </Box>
  )
}

export default ListContacts
