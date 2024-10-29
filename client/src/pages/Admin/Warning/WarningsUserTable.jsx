import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import InputBase from '@mui/material/InputBase'
import UserTableRow from '@/components/Admin/Table/UserTableRow'
import Box from '@mui/material/Box'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'
import { useNavigate, useParams } from 'react-router-dom'
import WarningsUserTableRow from '@/components/Admin/Table/WarningsUserTableRow'
import { getWarningsForUser } from '@/apis/warning/warningAPI'
import TableTitle from '@/components/Admin/Title/TableTitle'

const WarningsUserTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [warningsUser, setWarningsUser] = useState([])
  const { userId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchWarningsForUser = async () => {
      setLoading(true)
      try {
        const response = await getWarningsForUser(userId)
        setWarningsUser(response.warningsUser)
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchWarningsForUser()
  }, [])

  if (loading) return <Typography>Loading....</Typography>

  if (!loading && warningsUser?.length === 0) return <Typography>Không có dữ liệu</Typography>

  const filteredwarnings = warningsUser.filter((warning) => warning.message.toLowerCase().includes(searchQuery.toLowerCase()))

  // const filteredwarnings = warnings.filter((warning) => warning.email.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <>
      <TableTitle title={`Danh sách vi phạm của người dùng ${warningsUser[0].userId.fullname}`} path='/admin/warning' />
      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <InputBase
          placeholder='Tìm kiếm nội dung vi phạm'
          sx={{ flex: 1, padding: '5px 10px', border: '1px solid #ccc', borderRadius: '20px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell style={{ width: '50px' }} align='center'>
                Thứ tự
              </TableCell>
              <TableCell style={{ width: '100px' }} align='center'>
                Ảnh đại diện
              </TableCell>
              <TableCell style={{ width: '200px' }}>Email</TableCell>
              <TableCell style={{ width: '200px' }}>Họ tên</TableCell>
              <TableCell style={{ width: '150px' }} align='center'>
                Lý do vi phạm
              </TableCell>
              <TableCell style={{ width: '150px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredwarnings?.length > 0 ? (
              filteredwarnings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((warning, index) => <WarningsUserTableRow key={warning._id} warning={warning} serialNumber={page * rowsPerPage + index + 1} />)
            ) : (
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  Không tìm thấy nội dung tìm kiếm
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[4, 5, 6]}
          component='div'
          count={filteredwarnings.length}
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
      </TableContainer>
    </>
  )
}

export default WarningsUserTable
