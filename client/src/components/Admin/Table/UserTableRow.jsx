import React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { MoreVert } from '@mui/icons-material'
import UserMenu from '@/components/Admin/Menu/UserMenu'
import { TableCell, TableRow } from '@mui/material'

const UserTableRow = ({ user, handleCloseMenu, anchorEl, handleOpenMenu, setEditDialogOpen, setDialogOpen, setEditPosts }) => {
  return (
    <TableRow key={user.id} hover>
      <TableCell>
        <Avatar src={user.avatar} />
      </TableCell>
      <TableCell sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {user.fullname}
      </TableCell>
      <TableCell>{user.isAdmin ? 'Quản trị' : 'Người dùng'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{user.isVerify ? <CheckCircleIcon color='success' /> : '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip label={user.status === 'Active' ? 'Kích hoạt' : 'Đã khóa'} color={user.status === 'Active' ? 'success' : 'error'} variant='outlined' />
      </TableCell>
      <TableCell align='center'>
        <IconButton onClick={(event) => handleOpenMenu(event, user)}>
          <MoreVert />
        </IconButton>
        <UserMenu
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          onPostsClick={() => setEditPosts(true)}
          onEditClick={() => setEditDialogOpen(true)}
          onDeleteClick={() => setDialogOpen(true)}
        />
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
