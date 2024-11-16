import React from 'react'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { isMe } from '@/utils/helpers'

const MemberItem = ({ user, chat, currentUser, onRemoveMember, onLeaveGroup }) => {
  return (
    <FlexRow gap={2} p={2}>
      <Avatar src={user.avatar} />
      <Typography>{user.fullname}</Typography>
      <Typography variant='caption'>({user._id === chat.groupAdmin?._id ? 'Trưởng nhóm' : 'Thành viên'})</Typography>

      {/* Nếu là người dùng hiện tại */}
      {isMe(currentUser?._id, user?._id) ? (
        <Tooltip title='Rời khỏi nhóm'>
          <IconButton sx={{ ml: 'auto' }} onClick={onLeaveGroup}>
            <OutputOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        // Nếu là admin nhóm
        chat?.groupAdmin?._id === currentUser?._id && (
          <Tooltip title='Xóa thành viên'>
            <IconButton sx={{ ml: 'auto' }} onClick={() => onRemoveMember(user._id)}>
              <PersonRemoveOutlinedIcon />
            </IconButton>
          </Tooltip>
        )
      )}
    </FlexRow>
  )
}

export default MemberItem
