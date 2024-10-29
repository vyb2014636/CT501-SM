import React from 'react'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import { useNavigate } from 'react-router-dom'

const WarningTableRow = ({ warning, serialNumber }) => {
  const navigate = useNavigate()
  return (
    <TableRow hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell align='center'>
        <Avatar src={warning.avatar} sx={{ mx: 'auto' }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{warning.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{warning.fullname}</TableCell>
      <TableCell align='center'>{warning.count}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Chip label={warning.count >= 2 ? 'Vi phạm nhiều lần' : 'Cảnh cáo'} color={'error'} variant='outlined' />
      </TableCell>
      <TableCell align='center'>
        <Tooltip title='Xem danh sách các vi phạm'>
          <IconButton onClick={() => navigate(`${warning.userId}`)}>
            <RemoveRedEye />
          </IconButton>
        </Tooltip>
      </TableCell>
      {/* <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{warning.message}</TableCell> */}
      {/* <TableCell align='center'>{report.status !== 'resolved' && <ViewReportButton report={report} setReports={setReports} />}</TableCell> */}
    </TableRow>
  )
}

export default WarningTableRow
