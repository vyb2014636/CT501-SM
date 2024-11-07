import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { getViolations } from '@/apis/warning/violationAPI'
import TableTitle from '@/components/Admin/Title/TableTitle'
import ViolationRow from '@/components/Admin/Table/ViolationRow'

const Violations = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [violations, setViolations] = useState([])

  useEffect(() => {
    const fetchViolets = async () => {
      setLoading(true)
      try {
        const response = await getViolations()
        setViolations(response.warnings)
      } catch (error) {
        setError(true)
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchViolets()
  }, [])

  if (loading) return <Typography>Loading....</Typography>

  if (error) return <Typography>Không có dữ liệu</Typography>

  const filterViolations = violations.filter((violation) => violation.email.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <TableTitle title='Danh sách người dùng vi phạm' />

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
              <TableCell style={{ width: '100px' }} align='center'>
                Ảnh đại diện
              </TableCell>
              <TableCell style={{ width: '200px' }}>Email</TableCell>
              <TableCell style={{ width: '200px' }}>Họ tên</TableCell>
              <TableCell style={{ width: '150px' }} align='center'>
                Số lần cảnh cáo
              </TableCell>
              <TableCell style={{ width: '150px', textAlign: 'center' }}>Ghi chú</TableCell>
              <TableCell style={{ width: '150px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filterViolations?.length > 0 ? (
              filterViolations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((violation, index) => <ViolationRow key={violation._id} violation={violation} serialNumber={page * rowsPerPage + index + 1} />)
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
        count={filterViolations.length}
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

export default Violations
