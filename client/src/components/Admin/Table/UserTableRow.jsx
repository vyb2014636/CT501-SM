import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { MoreVert } from '@mui/icons-material'
import UserMenu from '@/components/Admin/Menu/UserMenu'
import { TableCell, TableRow } from '@mui/material'
import ViewHistoryButton from '../Button/ViewHistoryButton'

const UserTableRow = ({ user, serialNumber, history, setUsers }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMenu = (event, user) => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  // Chuyển đổi createdAt thành định dạng ngày tháng năm
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  return (
    <TableRow key={user.id} hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell>
        <Avatar src={user.avatar} />
      </TableCell>
      <TableCell sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {user.fullname}
      </TableCell>
      <TableCell sx={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {user.province && user.province !== '' ? user.province : 'Chưa nhập địa chỉ'}
      </TableCell>
      <TableCell>{user?.createdAt ? formatDate(user.createdAt) : '-'}</TableCell> {/* Hiển thị ngày tháng năm */}
      <TableCell sx={{ textAlign: 'center' }}>{user.isVerify ? <CheckCircleIcon color='success' /> : '-'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip label={user.status === 'Active' ? 'Kích hoạt' : 'Đã khóa'} color={user.status === 'Active' ? 'success' : 'error'} variant='outlined' />
      </TableCell>
      <TableCell align='center'>
        {history ? (
          <ViewHistoryButton user={user} setUsers={setUsers} />
        ) : (
          <>
            <IconButton onClick={(event) => handleOpenMenu(event, user)}>
              <MoreVert />
            </IconButton>
            <UserMenu anchorEl={anchorEl} onClose={handleCloseMenu} user={user} />
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
