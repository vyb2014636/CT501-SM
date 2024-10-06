import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FlexBetween from '@/components/Common/Flex/FlexBetween'

const ListContact = () => {
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

export default ListContact
