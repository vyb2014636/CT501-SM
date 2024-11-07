import React from 'react'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import { useNavigate } from 'react-router-dom'

const ViolationRow = ({ violation, serialNumber }) => {
  const navigate = useNavigate()
  return (
    <TableRow hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell align='center'>
        <Avatar src={violation.avatar} sx={{ mx: 'auto' }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{violation.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{violation.fullname}</TableCell>
      <TableCell align='center'>{violation.count}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip label={violation.count >= 2 ? 'Có thể khóa' : 'Cảnh cáo'} color={'error'} variant='outlined' />
      </TableCell>
      <TableCell align='center'>
        <Tooltip title='Xem danh sách các vi phạm'>
          <IconButton onClick={() => navigate(`${violation.userId}`)}>
            <RemoveRedEye />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default ViolationRow
