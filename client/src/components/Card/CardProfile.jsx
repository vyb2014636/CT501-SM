import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import img from '@/assets/postPic1.jpg'
import FlexRow from '@/components/Flex/FlexRow'
import FlexColumn from '@/components/Flex/FlexColumn'
import { formatFullname } from '@/utils/helpers'
import { Button } from '@mui/material'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined' // Icon Hủy kết bạn
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined' // Icon Hủy lời mời
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined' // Icon Đồng ý
import { checkFriendshipAPI } from '@/apis/user/userAPI'

const CardProfile = ({ user, totalPosts }) => {
  const [value, setValue] = useState(0)
  const [statusFriendship, setStatusFriendship] = useState('')

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      const response = await checkFriendshipAPI(user._id)
      setStatusFriendship(response.status)
    }
    fetchFriendshipStatus()
  }, [user._id])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Hàm xử lý logic button
  const renderFriendshipButton = () => {
    switch (statusFriendship) {
      case 'friends':
        return (
          <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 152 }} color='info'>
            <PersonRemoveAlt1OutlinedIcon />
            <Typography variant='body1' fontWeight='bold'>
              Hủy kết bạn
            </Typography>
          </Button>
        )
      case 'waitAccept':
        return (
          <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 152 }}>
            <CancelOutlinedIcon />
            <Typography variant='body1' fontWeight='bold'>
              Hủy lời mời
            </Typography>
          </Button>
        )
      case 'waitMe':
        return (
          <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 120 }}>
            <CheckOutlinedIcon />
            <Typography variant='body1' fontWeight='bold'>
              Đồng ý
            </Typography>
          </Button>
        )
      default:
        return (
          <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 138 }}>
            <PersonAddAlt1OutlinedIcon />
            <Typography variant='body1' fontWeight='bold'>
              Thêm bạn
            </Typography>
          </Button>
        )
    }
  }

  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0 ', mb: 2 }}>
      <Box
        sx={{
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50%',
          borderRadius: '12px 12px 0 0',
          position: 'relative'
        }}>
        <Avatar
          src={user?.avatar}
          sx={{
            width: 80,
            height: 80,
            border: '4px solid',
            borderColor: 'background.paper',
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {formatFullname(user?.firstname, user?.lastname)}
        </Typography>
      </Box>

      <FlexRow justifyContent='center' gap={2} my={2}>
        {statusFriendship.toString() !== 'isMe' && (
          <>
            {renderFriendshipButton()}
            <Button variant='outlined' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 126 }}>
              <SendOutlinedIcon />
              <Typography variant='body1' fontWeight='bold'>
                Nhắn tin
              </Typography>
            </Button>
          </>
        )}
      </FlexRow>

      <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
        <FlexRow gap={4} justifyContent='center'>
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>{user?.friends?.length}</Typography>
            <Typography variant='body2'>Bạn bè</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>{totalPosts}</Typography>
            <Typography variant='body2'>Bài viết</Typography>
          </Box>
        </FlexRow>
      </Box>

      <Box mt='auto'>
        <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' textColor='primary' indicatorColor='primary'>
          <Tab label='Bài viết' />
          <Tab label='Bạn bè' />
          <Tab label='Ảnh' />
          <Tab label='Video' />
        </Tabs>
      </Box>
    </FlexColumn>
  )
}

export default CardProfile
