import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import ContactCard from './Card/ContactCard'
import { MenuList } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material' // Import biểu tượng sad

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
      <MenuList>
        {user.friends && user.friends.length > 0 ? ( // Kiểm tra mảng bạn bè
          user.friends.map((contact, index) => <ContactCard user={contact} index={index} key={index} />)
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 2 }}>
            <SentimentDissatisfied sx={{ fontSize: 50, color: 'gray', mb: 1 }} /> {/* Biểu tượng không có bạn bè */}
            <Typography variant='subtitle1' color='text.secondary'>
              Không có bạn bè
            </Typography>
          </Box>
        )}
      </MenuList>
    </Box>
  )
}

export default ListContact
