import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import img from '@/img/postPic1.jpg'
import avatar from '@/assets/avatarDefault.png'
import FlexRow from '@/components/Flex/FlexRow'
import FlexColumn from '@/components/Flex/FlexColumn'
import { formatFullname } from '@/utils/helpers'

const ProfileCard = ({ user }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0 ' }}>
      {/* Cover Photo */}
      <Box
        sx={{
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50%',
          borderRadius: '12px 12px 0 0',
          position: 'relative'
        }}>
        {/* Avatar */}
        <Avatar
          src={avatar}
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

      {/* User Information */}
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {formatFullname(user?.firstname, user?.lastname)}
        </Typography>

        {/* Follower, Following, Posts */}
      </Box>
      <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
        <FlexRow gap={4} justifyContent='center'>
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>1</Typography>
            <Typography variant='body2'>Followers</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>2</Typography>
            <Typography variant='body2'>Posts</Typography>
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

export default ProfileCard
