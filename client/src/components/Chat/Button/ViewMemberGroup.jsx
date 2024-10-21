import React, { memo, useState } from 'react'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import { useNavigate } from 'react-router-dom'
import { sortChatsByLatestMessage } from '@/services/sort'
import { Avatar, Box, IconButton, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import AddGroupForm from '../Form/AddGroupForm'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexColumn from '@/components/Common/Flex/FlexColumn'

const ViewMemberGroup = ({ chat }) => {
  const [openViewMember, setOpenViewMember] = useState(false)

  const handleOpenViewMember = () => setOpenViewMember(true)
  const handleCloseViewMember = () => setOpenViewMember(false)
  return (
    <>
      <ListItemButton onClick={handleOpenViewMember}>
        <ListItemIcon>
          <GroupOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary='Xem thành viên' />
      </ListItemButton>
      <ModalWrapper open={openViewMember} onClose={handleCloseViewMember} title='Thành viên nhóm'>
        <FlexColumn p={3} gap={2} overflow='auto'>
          {chat.users.map((user) => (
            <FlexRow gap={2}>
              <Avatar src={user.avatar} />
              <Typography>{user.fullname}</Typography>
              <Typography variant='caption'>({user._id.toString() === chat.groupAdmin._id.toString() ? 'Trưởng nhóm' : 'Thành viên'})</Typography>
            </FlexRow>
          ))}
        </FlexColumn>
      </ModalWrapper>
    </>
  )
}

export default memo(ViewMemberGroup)
