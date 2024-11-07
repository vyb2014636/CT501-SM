import React from 'react'
import Avatar from '@mui/material/Avatar'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useNavigate } from 'react-router-dom'
import ViewViolationReportsButton from '../Button/ViewViolationReportsButton'
import { Chip } from '@mui/material'

const ReportViolationRow = ({ violation, user, serialNumber }) => {
  const navigate = useNavigate()
  console.log(violation)
  return (
    <TableRow hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell align='center'>
        <Avatar src={user.avatar} sx={{ mx: 'auto' }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{user.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{user.fullname}</TableCell>
      <TableCell align='center'>{violation.total_reports}</TableCell>
      <TableCell align='center'>{violation.invalid_reports}</TableCell>
      <TableCell align='center'>
        <Chip label={violation.lock_until ? 'Đã khóa quyền báo cáo' : 'Chưa khóa'} color={violation.lock_until ? 'error' : 'warning'} />
      </TableCell>
      <TableCell align='center'>
        <ViewViolationReportsButton ViolationReports={violation.report_history} />
      </TableCell>
    </TableRow>
  )
}

export default ReportViolationRow
