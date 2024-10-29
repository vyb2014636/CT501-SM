import React from 'react'
import Chip from '@mui/material/Chip'
import { TableCell, TableRow } from '@mui/material'
import ViewReportButton from '../Button/ViewReportButton'

const ReportTableRow = ({ report, setReports, serialNumber }) => {
  return (
    <TableRow key={report.id} hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{report.reportCode}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{report.reporter.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {report.reportedUser.email}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{report.reason}</TableCell>
      <TableCell>{report.post?.sharedPost ? 'Bài chia sẻ' : 'Bài đăng gốc'}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip
          label={report.status === 'resolved' ? 'Đã xử lý' : 'Chưa xử lý'}
          color={report.status === 'resolved' ? 'success' : 'secondary'}
          variant='outlined'
        />
      </TableCell>
      <TableCell align='center'>{report.status !== 'resolved' && <ViewReportButton report={report} setReports={setReports} />}</TableCell>
    </TableRow>
  )
}

export default ReportTableRow
