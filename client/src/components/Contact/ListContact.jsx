import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import ContactCard from './Card/ContactCard'
import { MenuList, Skeleton } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'

const ListContact = () => {
  const { user, loading } = useSelector((state) => state.auth)

  return (
    <Box
      sx={{
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
        {loading ? (
          // Hiển thị skeleton khi đang tải
          <>
            <Skeleton variant='text' width='40%' height={30} sx={{ marginBottom: 2 }} />
            <Skeleton variant='circular' width={30} height={30} sx={{ marginBottom: 2 }} />
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Skeleton variant='circular' width={40} height={40} sx={{ marginRight: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant='text' width='60%' height={20} sx={{ marginBottom: 1 }} />
                  <Skeleton variant='text' width='50%' height={20} />
                </Box>
              </Box>
            ))}
          </>
        ) : user?.friends && user?.friends.length > 0 ? (
          user.friends.map((contact) => <ContactCard key={contact._id} user={contact} />)
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 2 }}>
            <SentimentDissatisfied sx={{ fontSize: 50, color: 'gray', mb: 1 }} />
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
