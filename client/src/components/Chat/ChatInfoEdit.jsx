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
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined'
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import ViewMemberGroup from './Button/ViewMemberGroup'

const ChatInfoEdit = ({ chat, onSave, onCancel }) => {
  const [chatName, setChatName] = useState(chat.chatName || '')
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  const handleSave = () => {
    onSave(chat._id, { chatName }) // Gọi hàm lưu thông tin chat
  }

  return (
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
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <DriveFileRenameOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Đổi tên đoạn chat' />
        </ListItemButton>
        <ViewMemberGroup chat={chat} />
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <GroupRemoveOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Xóa thành viên' />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <OutputOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Rời nhóm' />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default ChatInfoEdit
