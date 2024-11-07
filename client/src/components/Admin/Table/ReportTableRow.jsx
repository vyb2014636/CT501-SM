import React from 'react'
import Chip from '@mui/material/Chip'
import { TableCell, TableRow } from '@mui/material'
import ViewReportButton from '../Button/ViewReportButton'
import ViewReplyReportButton from '../Button/ViewReplyReportButton'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { RemoveRedEye } from '@mui/icons-material'
import { format } from 'date-fns'

const ReportTableRow = ({ report, setReports, serialNumber }) => {
  return (
    <TableRow key={report.id} hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{report.reportCode}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{report.reporter.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        {report.reportedUser.email}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{report.reason}</TableCell>
      <TableCell>{format(new Date(report.createdAt), 'dd/MM/yyyy')}</TableCell>

      <TableCell sx={{ textAlign: 'center' }}>
        <Chip
          label={report.status === 'resolved' ? 'Đã xử lý' : report.status === 'reprocess' ? 'Chờ xử lý lại' : 'Chưa xử lý'}
          color={report.status === 'resolved' ? 'success' : report.status === 'reprocess' ? 'warning' : 'secondary'}
          variant='outlined'
        />
      </TableCell>
      <TableCell align='center'>
        {report.status === 'pending' ? (
          <ViewReportButton report={report} setReports={setReports}>
            <Tooltip title='Xem bài đăng'>
              <IconButton>
                <RemoveRedEye />
              </IconButton>
            </Tooltip>
          </ViewReportButton>
        ) : report.status === 'reprocess' ? (
          <ViewReplyReportButton report={report} setReports={setReports} />
        ) : (
          <ViewReportButton report={report} setReports={setReports} view>
            <Tooltip title='Xem bài đăng'>
              <IconButton>
                <RemoveRedEye />
              </IconButton>
            </Tooltip>
          </ViewReportButton>
        )}
      </TableCell>
    </TableRow>
  )
}

export default ReportTableRow
