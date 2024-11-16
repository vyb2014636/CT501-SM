import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { isMe } from '@/utils/helpers'
import ConfirmDialog from '../Group/ConfirmDialog'
import LeaveGroupDialog from '../Group/LeaveGroupDialog'
import MemberItem from '../Group/MemberItem'
import { dissolveGroupAPI, leaveGroupAPI, removeMemberGroupAPI, updatedAdminGroupAPI } from '@/apis/chat/chatAPI'
import { removeChat, updatedUserInChat } from '@/features/chat/chatSlice'
import { toast } from 'react-toastify'

const ViewMemberGroup = ({ chat }) => {
  const dispatch = useDispatch()
  const [openViewMember, setOpenViewMember] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [leaveGroupDialog, setLeaveGroupDialog] = useState(false)
  const [newAdmin, setNewAdmin] = useState(null)
  const [memberToRemove, setMemberToRemove] = useState(null)
  const currentUser = useSelector((state) => state.auth.user)
  const handleOpenViewMember = () => setOpenViewMember(true)
  const handleCloseViewMember = () => setOpenViewMember(false)

  const handleLeaveGroupDialogOpen = () => setLeaveGroupDialog(true)
  const handleLeaveGroupDialogClose = () => setLeaveGroupDialog(false)

  const handleConfirmDialogOpen = (userId) => {
    setMemberToRemove(userId)
    setOpenConfirmDialog(true)
  }
  const handleConfirmDialogClose = () => {
    setMemberToRemove(null)
    setOpenConfirmDialog(false)
  }
  const handleLeaveGroup = async () => {
    try {
      if (chat?.groupAdmin._id === currentUser?._id) {
        if (chat?.users?.length === 1) {
          const response = await dissolveGroupAPI(chat?._id)
          dispatch(removeChat(response?.chat))
        } else {
          if (!newAdmin) {
            toast.error('Vui lòng chọn trưởng nhóm')
            return
          } else {
            await leaveGroupAPI(chat?._id)
            const response = await updatedAdminGroupAPI(chat?._id, newAdmin, currentUser?._id)
            dispatch(removeChat(response?.chat))
          }
        }
      } else {
        const response = await leaveGroupAPI(chat?._id)
        dispatch(removeChat(response?.chat))
      }
      toast.success('Thành công')
      handleLeaveGroupDialogClose()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRemoveMember = async () => {
    try {
      if (memberToRemove) {
        const response = await removeMemberGroupAPI(chat?._id, memberToRemove)
        dispatch(updatedUserInChat(response))
      }
      toast.success('Giải tán nhóm thành công')
      handleConfirmDialogClose()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <ListItemButton onClick={handleOpenViewMember}>
        <ListItemIcon>
          <GroupOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary='Xem thành viên' />
      </ListItemButton>

      {/* Modal xem thành viên */}
      <ModalWrapper open={openViewMember} onClose={handleCloseViewMember} title='Thành viên nhóm'>
        {chat.users.map((user) => (
          <MemberItem
            key={user._id}
            user={user}
            chat={chat}
            currentUser={currentUser}
            onRemoveMember={handleConfirmDialogOpen}
            onLeaveGroup={handleLeaveGroupDialogOpen}
          />
        ))}
      </ModalWrapper>

      {/* Hộp thoại xác nhận xóa thành viên */}
      <ConfirmDialog open={openConfirmDialog} onClose={handleConfirmDialogClose} onConfirm={handleRemoveMember} />

      {/* Hộp thoại xác nhận rời nhóm */}
      <LeaveGroupDialog
        open={leaveGroupDialog}
        onClose={handleLeaveGroupDialogClose}
        users={chat.users}
        chat={chat}
        currentUser={currentUser}
        newAdmin={newAdmin}
        setNewAdmin={setNewAdmin}
        onLeaveGroup={handleLeaveGroup}
      />
    </>
  )
}

export default memo(ViewMemberGroup)
