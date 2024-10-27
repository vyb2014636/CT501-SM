import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { MoreVert } from '@mui/icons-material'
import UserMenu from '@/components/Admin/Menu/UserMenu'
import { TableCell, TableRow } from '@mui/material'

const UserTableRow = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event, user) => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)
  return (
    <TableRow key={user.id} hover>
      <TableCell>
        <Avatar src={user.avatar} />
      </TableCell>
      <TableCell sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {user.fullname}
      </TableCell>
      <TableCell sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {user.address ? `${user.address.district}, ${user.address.ward} ,${user.address.province} ` : 'Chưa nhập địa chỉ'}
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
        <UserMenu anchorEl={anchorEl} onClose={handleCloseMenu} user={user} />
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
