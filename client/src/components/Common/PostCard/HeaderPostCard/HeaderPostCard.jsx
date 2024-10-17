import React, { useState } from 'react'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { formatFullname } from '@/utils/helpers'
import { avatarStyleMui, titleAvatarStyleMui } from '@/styles/styles'
import MoreVertButton from './Button/MoreVertButton'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import vi from 'date-fns/locale/vi'

const HeaderPostCard = ({ userPost, post, visibleMenu }) => {
  const handleProfileClick = useProfileNavigation()
  return (
    <CardHeader
      sx={{ py: 2 }}
      avatar={
        <Avatar
          src={userPost.avatar}
          alt='Profile Picture'
          sx={{ width: 44, height: 44, ...avatarStyleMui }}
          onClick={() => handleProfileClick(userPost._id)}
        />
      }
      title={
        <Typography variant='h6' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(userPost._id)}>
          {formatFullname(userPost.firstname, userPost.lastname)}
        </Typography>
      }
      action={visibleMenu && <MoreVertButton userPost={userPost} />}
      subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: vi })}
    />
  )
}

export default HeaderPostCard
