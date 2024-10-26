import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MoreVert } from '@mui/icons-material'

const UserMenu = ({ anchorEl, onClose, onEditClick, onDeleteClick, onPostsClick }) => {
  const open = Boolean(anchorEl)

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onPostsClick()
          onClose()
        }}>
        Danh sách bài đăng
      </MenuItem>
      <MenuItem
        onClick={() => {
          onEditClick()
          onClose()
        }}>
        Chỉnh sửa
      </MenuItem>
      <MenuItem
        onClick={() => {
          onDeleteClick()
          onClose()
        }}>
        Xóa
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
