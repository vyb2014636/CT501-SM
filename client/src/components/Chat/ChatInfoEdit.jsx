import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItemIcon,
  IconButton
} from '@mui/material'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import ViewMemberGroup from './Button/ViewMemberGroup'
import { useDispatch, useSelector } from 'react-redux'
import { addMembersToGroupAPI, dissolveGroupAPI, leaveGroupAPI, updatedAdminGroupAPI } from '@/apis/chat/chatAPI'
import { removeChat, updatedUserInChat } from '@/features/chat/chatSlice'
import LeaveGroupDialog from './Group/LeaveGroupDialog'
import { toast } from 'react-toastify'
import AddMembersModal from './Group/AddMembersModal'

const ChatInfoEdit = ({ chat, onSave, onCancel }) => {
  const [leaveGroupDialog, setLeaveGroupDialog] = useState(false)
  const [addMembersDialog, setAddMembersDialog] = useState(false) // Thêm state quản lý modal

  const [chatName, setChatName] = useState(chat.chatName || '')
  const [open, setOpen] = useState(true)
  const currentUser = useSelector((state) => state.auth.user)
  const [newAdmin, setNewAdmin] = useState(null)
  const dispatch = useDispatch()

  const handleLeaveGroupDialogOpen = () => setLeaveGroupDialog(true)
  const handleLeaveGroupDialogClose = () => setLeaveGroupDialog(false)
  const handleAddMembersDialogOpen = () => setAddMembersDialog(true)
  const handleAddMembersDialogClose = () => setAddMembersDialog(false)

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
      dispatch(updatedUserInChat(response))
      toast.success('Thành công')
      handleLeaveGroupDialogClose()
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleAddMembers = async (selectedMembers) => {
    try {
      if (!Array.isArray(selectedMembers) || selectedMembers.length === 0) {
        toast.error('Vui lòng chọn thành viên để thêm vào nhóm')
        return
      }
      await addMembersToGroupAPI(chat._id, selectedMembers)

      toast.success('Thêm thành viên thành công!')
      handleAddMembersDialogClose()
    } catch (error) {
      toast.error(error?.message || 'Đã xảy ra lỗi, vui lòng thử lại')
    }
  }

  return (
    <>
      <Box sx={{ p: 2 }} position='relative'>
        <IconButton
          onClick={onCancel}
          sx={{ position: 'absolute', top: 16, left: 16 }} // Đặt vị trí absolute cho icon
        >
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>
        <Typography variant='h5' fontWeight='bold' textAlign='center' color='primary' p={4}>
          Thông tin
        </Typography>

        <Avatar src={chat?.avatar} sx={{ mx: 'auto', height: 75, width: 75 }} />

        <Typography variant='h6' textAlign='center'>
          {chatName}
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>
          <ListItemButton>
            <ListItemIcon>
              <DriveFileRenameOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Đổi tên đoạn chat' />
          </ListItemButton>
          <ViewMemberGroup chat={chat} />
          <ListItemButton onClick={handleAddMembersDialogOpen}>
            <ListItemIcon>
              <GroupAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Thêm thành viên' />
          </ListItemButton>
          <ListItemButton onClick={handleLeaveGroupDialogOpen}>
            <ListItemIcon>
              <OutputOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Rời nhóm' />
          </ListItemButton>
        </List>
      </Box>

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

      <AddMembersModal
        open={addMembersDialog}
        onClose={handleAddMembersDialogClose}
        friends={currentUser?.friends.filter((friend) => !chat.users.some((user) => user._id === friend._id))} // Lọc bạn bè không thuộc nhóm
        onAddMembers={handleAddMembers}
      />
    </>
  )
}

export default ChatInfoEdit
