import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import ContactCard from './Card/ContactCard'
import { MenuList } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material' // Biểu tượng sad
import { useLocation } from 'react-router-dom'

const ListContact = () => {
  const { user } = useSelector((state) => state.auth)
  // const [selectedUserId, setSelectedUserId] = useState(null) // State để lưu user đã chọn
  // const location = useLocation() // Lấy thông tin về đường dẫn hiện tại
  // useEffect(() => {
  //   const pathMatch = /^\/chat\/[a-zA-Z0-9]+$/
  //   if (!pathMatch.test(location.pathname)) {
  //     setSelectedUserId(null)
  //   }
  // }, [location.pathname])
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
        {user.friends && user.friends.length > 0 ? (
          user.friends.map((contact) => (
            <ContactCard
              key={contact._id}
              user={contact}
              // selectedUserId={selectedUserId} // Truyền selectedUserId vào từng card
              // setSelectedUserId={setSelectedUserId} // Truyền hàm để thay đổi selectedUserId
            />
          ))
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
