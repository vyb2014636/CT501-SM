import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { RemoveRedEye } from '@mui/icons-material'
import UserMenu from '@/components/Admin/Menu/UserMenu'
import { TableCell, TableRow, Tooltip } from '@mui/material'

const ReportTableRow = ({ report }) => {
  console.log(report)
  return (
    <TableRow key={report.id} hover>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{report.reportCode}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{report.reporter.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {report.reportedUser.email}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{report.reason}</TableCell>
      <TableCell>{report.post.sharedPost ? 'Bài chia sẻ' : 'Bài đăng gốc'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip
          label={report.status === 'resolved' ? 'Đã xử lý' : 'Chưa xử lý'}
          color={report.status === 'resolved' ? 'success' : 'secondary'}
          variant='outlined'
        />
      </TableCell>
      <TableCell align='center'>
        <Tooltip title='Xem bài đăng'>
          <IconButton>
            <RemoveRedEye />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default ReportTableRow
