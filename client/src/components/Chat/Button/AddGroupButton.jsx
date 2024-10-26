import React, { memo, useState } from 'react'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import { useNavigate } from 'react-router-dom'
import { sortChatsByLatestMessage } from '@/services/sort'
import { IconButton, Tooltip } from '@mui/material'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import AddGroupForm from '../Form/AddGroupForm'
import { useDispatch } from 'react-redux'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import { createGroupChat } from '@/features/chat/chatThunk'
import { toast } from 'react-toastify'

const AddGroupButton = ({ currentUser, chats }) => {
  const dispatch = useDispatch()

  const [openAddGroup, setOpenAddGroup] = useState(false)

  const handleOpenAddGroup = () => setOpenAddGroup(true)
  const handleCloseAddGroup = () => setOpenAddGroup(false)
  const handleCreateGroup = async (checked, groupName, selectedImage) => {
    const groupsCreatedByUser = chats.filter((chat) => chat?.groupAdmin?._id.toString() === currentUser._id.toString())
    if (groupsCreatedByUser.length >= 10) {
      toast.error('Tối đa 10 nhóm')
    } else {
      dispatch(openBackdrop())

      if (!groupName.trim() || checked.length === 0) return // Kiểm tra trước khi gửi

      const formData = new FormData()
      formData.append('users', JSON.stringify(checked))
      formData.append('chatName', groupName)
      if (selectedImage) {
        const response = await fetch(selectedImage)
        const blob = await response.blob()
        formData.append('avatarGroup', blob, selectedImage.name)
      }

      try {
        await dispatch(createGroupChat(formData)).unwrap()
        toast.success('Tạo thành công')
      } catch (error) {
        toast.error(`Đã xảy ra lỗi: ${error}`)
      }

      handleCloseAddGroup()
      dispatch(closeBackdrop())
    }
  }

  return (
    <>
      <Tooltip title='Thêm nhóm'>
        <IconButton color='primary' onClick={handleOpenAddGroup}>
          <GroupAddOutlinedIcon />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={openAddGroup} onClose={handleCloseAddGroup} title='Tạo nhóm'>
        <AddGroupForm currentUser={currentUser} handleCloseAddGroup={handleCloseAddGroup} handleCreateGroup={handleCreateGroup} />
      </ModalWrapper>
    </>
  )
}

export default memo(AddGroupButton)
