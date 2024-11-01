import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import InputBase from '@mui/material/InputBase'
import UserTableRow from '@/components/Admin/Table/UserTableRow'
import Box from '@mui/material/Box'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'
import { fetchListUserForAdmin } from '@/apis/user/userAPI'
import { Typography } from '@mui/material'
import { getReports } from '@/apis/report/reportAPI'
import ReportTableRow from '@/components/Admin/Table/ReportTableRow'
import TableTitle from '@/components/Admin/Title/TableTitle'

const ReportTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const response = await getReports()
        setReports(response.reports)
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchReports()
  }, [])

  if (loading) return <Typography>Loading....</Typography>

  if (!loading && !reports.length) return <Typography>Không có dữ liệu</Typography>

  const filteredreports = reports.filter((report) => report.reporter.email.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <>
      <TableTitle title='Danh sách khiếu nại' />

      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <InputBase
          placeholder='Tìm kiếm người dùng báo cáo'
          sx={{ flex: 1, padding: '5px 10px', border: '1px solid #ccc', borderRadius: '20px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell style={{ width: '100px' }} align='center'>
                Thứ tự
              </TableCell>
              <TableCell style={{ width: '100px' }}>Mã báo cáo</TableCell>
              <TableCell style={{ width: '200px' }}>Tài khoản báo cáo</TableCell>
              <TableCell style={{ width: '200px' }}>Tài khoản bị báo cáo</TableCell>
              <TableCell style={{ width: '200px' }}>Lý do</TableCell>
              <TableCell style={{ width: '100px' }}>Ngày gửi</TableCell>
              <TableCell style={{ width: '150px', textAlign: 'center' }}>Trạng thái</TableCell>
              <TableCell style={{ width: '150px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredreports?.length > 0 ? (
              filteredreports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report, index) => (
                  <ReportTableRow key={report._id} report={report} setReports={setReports} serialNumber={page * rowsPerPage + index + 1} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  Không tìm thấy nội dung tìm kiếm
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 5, 6]}
        component='div'
        count={filteredreports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage='Số dòng trên trang' // Đổi tên ở đây
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`} // Đổi văn bản ở đây
      />
    </>
  )
}

export default ReportTable
