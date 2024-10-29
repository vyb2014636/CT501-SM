import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'

const WarningsUserTableRow = ({ warning, serialNumber }) => {
  return (
    <TableRow hover>
      <TableCell align='center'>{serialNumber}</TableCell>
      <TableCell align='center'>
        <Avatar src={warning.userId.avatar} sx={{ mx: 'auto' }} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{warning.userId.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{warning.userId.fullname}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{warning.message}</TableCell>
      <TableCell align='center'>
        {/* <Tooltip title='Xem danh sách các vi phạm'>
          <IconButton onClick={() => navigate(`${warning.userId}`)}>
            <RemoveRedEye />
          </IconButton>
        </Tooltip> */}
      </TableCell>
      {/* <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{warning.message}</TableCell> */}
      {/* <TableCell align='center'>{report.status !== 'resolved' && <ViewReportButton report={report} setReports={setReports} />}</TableCell> */}
    </TableRow>
  )
}

export default WarningsUserTableRow
