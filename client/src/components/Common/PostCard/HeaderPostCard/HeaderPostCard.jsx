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
import StyledAvatar from '../../AvatarStatus/StyledAvatar'

const HeaderPostCard = ({ userPost, post, visibleMenu, admin }) => {
  const handleProfileClick = useProfileNavigation()
  return (
    <CardHeader
      sx={{ py: 2 }}
      avatar={
        <StyledAvatar
          user={userPost}
          style={{ width: 44, height: 44, ...avatarStyleMui }} // Đảm bảo style là một object
          handleOnclick={() => handleProfileClick(userPost._id)}
        />
      }
      title={
        <Typography variant='h6' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(userPost._id)}>
          {formatFullname(userPost.firstname, userPost.lastname)}
        </Typography>
      }
      action={visibleMenu && !admin && <MoreVertButton userPost={userPost} post={post} />}
      subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: vi })}
    />
  )
}

export default HeaderPostCard
