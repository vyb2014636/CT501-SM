import React, { memo, useState } from 'react'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import { useNavigate } from 'react-router-dom'
import { sortChatsByLatestMessage } from '@/services/sort'
import { IconButton, Tooltip } from '@mui/material'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import AddGroupForm from '../Form/AddGroupForm'
const AddGroupButton = ({ currentUser }) => {
  const [openAddGroup, setOpenAddGroup] = useState(false)

  const handleOpenAddGroup = () => setOpenAddGroup(true)
  const handleCloseAddGroup = () => setOpenAddGroup(false)
  return (
    <>
      <Tooltip title='Thêm nhóm'>
        <IconButton color='primary' onClick={handleOpenAddGroup}>
          <GroupAddOutlinedIcon />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={openAddGroup} onClose={handleCloseAddGroup} title='Tạo nhóm'>
        <AddGroupForm currentUser={currentUser} handleCloseAddGroup={handleCloseAddGroup} />
      </ModalWrapper>
    </>
  )
}

export default memo(AddGroupButton)
