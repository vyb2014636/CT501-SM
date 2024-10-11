import React, { useState } from 'react'
import FlexRow from '../../Common/Flex/FlexRow'
import { Avatar, Button, Typography } from '@mui/material'
import FlexColumn from '../../Common/Flex/FlexColumn'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { avatarStyleMui, titleAvatarStyleMui } from '@/styles/styles'
import FriendShip from '../Button/FriendShip'

const SearchCard = ({ user }) => {
  const handleProfileClick = useProfileNavigation()

  return (
    <FlexRow key={user._id} sx={{ alignItems: 'center', gap: '12px', p: 2 }}>
      <Avatar alt={user.lastname} src={user.avatar} sx={{ width: 44, height: 44, ...avatarStyleMui }} onClick={() => handleProfileClick(user._id)} />
      <FlexColumn>
        <Typography variant='subtitle1' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(user._id)}>
          {user.fullname}
        </Typography>
        <Typography variant='body2'>4 bài viết</Typography>
      </FlexColumn>
      <FlexRow ml='auto'>
        <FriendShip user={user} />
      </FlexRow>
    </FlexRow>
  )
}

export default SearchCard
