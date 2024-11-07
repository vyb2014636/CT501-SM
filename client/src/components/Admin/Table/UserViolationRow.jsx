import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'
import ViewReportButton from '../Button/ViewReportButton'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { RemoveRedEye } from '@mui/icons-material'

const UserViolationRow = ({ userViolation, serialNumber }) => {
  return (
    <TableRow hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell align='center'>
        <Avatar src={userViolation.userId.avatar} sx={{ mx: 'auto' }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
        {userViolation.userId.email}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {userViolation.userId.fullname}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{userViolation.message}</TableCell>
      <TableCell align='center'>
        <ViewReportButton report={userViolation.reportId} view>
          <Tooltip title='Xem bài đăng'>
            <IconButton>
              <RemoveRedEye />
            </IconButton>
          </Tooltip>
        </ViewReportButton>
      </TableCell>
    </TableRow>
  )
}

export default UserViolationRow
