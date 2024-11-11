import React from 'react'
import { Avatar, Typography, Box, Tooltip } from '@mui/material'
import FriendShip from '@/components/Search/Button/FriendShip'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import FlexRow from '@/components/Common/Flex/FlexRow'
import avatarDF from '@/assets/avatarDefault.png'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'

const FriendCard = ({ user }) => {
  const handleProfileClick = useProfileNavigation()

  return (
    <FlexRow
      sx={{
        p: 1,
        width: { xs: '100%', sm: '49%' },
        gap: 3,
        alignItems: 'center',
        border: 1,
        borderColor: 'background.default',
        borderRadius: 2
      }}>
      <Box
        component='img'
        src={user.avatar || avatarDF}
        onError={(e) => (e.target.src = avatarDF)} // Fallback on image load error
        sx={{
          width: { xs: 50, sm: 80 }, // Responsive size
          height: { xs: 50, sm: 80 },
          borderRadius: 2,
          border: 1,
          borderColor: 'background.default',
          flexDirection: { xs: 'row', sm: 'column' },
          cursor: 'pointer',
          '&:hover': {
            filter: 'brightness(0.7)',
            transition: 'filter 0.3s ease'
          }
        }}
        onClick={() => handleProfileClick(user._id)}
      />
      <FlexColumn
        sx={{
          height: 80,
          flex: 1,
          gap: 1,
          flexDirection: { xs: 'row', sm: 'column' },
          alignItems: { xs: 'center', sm: 'start' },
          justifyContent: { xs: 'space-between', sm: 'center' }
        }}>
        <Box>
          <Tooltip title={user.fullname} placement='top'>
            <Typography
              variant='body1'
              fontWeight='medium'
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: { xs: '300px', sm: '150px' }
              }}>
              {user.fullname}
            </Typography>
          </Tooltip>
          <Typography variant='body2' color='text.secondary'>
            4 bạn chung
          </Typography>
        </Box>
        <FriendShip user={user} />
      </FlexColumn>
    </FlexRow>
  )
}

export default FriendCard
