import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import axiosIntercept from '@/apis/axiosIntercept'
import FlexRow from '@components/Common/Flex/FlexRow'
import FlexColumn from '@components/Common/Flex/FlexColumn'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import FlexStartButton from '@components/Common/Flex/FlexStartButton'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { formatFullname } from '@/utils/helpers'
import ModalPost from './Modal/ModalPost'

const PostBox = ({ user }) => {
  const handleTestRefreshToken = async () => {
    const response = await axiosIntercept.get('/auth/refreshToken')
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: '12px', p: 4, gap: 3 }}>
      <FlexColumn sx={{ width: '100%', gap: 3 }}>
        <FlexRow>
          <Avatar alt={user && formatFullname(user?.firstname, user?.lastname)} src={user && user.avatar} sx={{ width: 48, height: 48 }} />
          <ModalPost user={user}>
            <FlexStartButton
              sx={{
                width: '100%',
                height: '100%',
                ml: 2,
                backgroundColor: 'neutral.primary',
                borderRadius: '12px',
                color: 'gray',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
              Hãy nêu lên suy nghĩ của bạn
            </FlexStartButton>
          </ModalPost>
        </FlexRow>

        <Divider />

        <FlexRow justifyContent='end'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <ModalPost user={user}>
              <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                <PhotoOutlinedIcon color='primary' size='small' />
                <Typography color='primary' fontWeight='bold'>
                  Hình ảnh
                </Typography>
              </Button>
            </ModalPost>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <ModalPost user={user}>
              <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                <PlayCircleOutlineIcon color='primary' size='small' />
                <Typography color='primary' fontWeight='bold'>
                  Video
                </Typography>
              </Button>
            </ModalPost>
          </Box>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }} onClick={handleTestRefreshToken}>
            <LocationOnOutlinedIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Vị trí
            </Typography>
          </Button>
        </FlexRow>
      </FlexColumn>
    </Box>
  )
}

export default PostBox
