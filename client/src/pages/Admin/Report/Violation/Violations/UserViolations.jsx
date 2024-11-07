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
import Box from '@mui/material/Box'
import { useNavigate, useParams } from 'react-router-dom'
import UserViolationRow from '@/components/Admin/Table/UserViolationRow'
import { getUserViolations } from '@/apis/warning/violationAPI'
import TableTitle from '@/components/Admin/Title/TableTitle'

import BlockUnlockButton from '@/components/Admin/Button/BlockUnlockButton'

const UserViolets = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [violationsOfUser, setViolationsOfUser] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    const fetchViolationsForUser = async () => {
      setLoading(true)
      try {
        const response = await getUserViolations(userId)
        setViolationsOfUser(response.warningsUser)
        setStatus(response.warningsUser[0].userId.status)
      } catch (error) {
        setError(true)
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchViolationsForUser()
  }, [])

  if (loading) return <Typography>Loading....</Typography>

  if (error) return <Typography>Không có dữ liệu</Typography>

  const filteredViolationOfUser = violationsOfUser.filter((violation) => violation.message.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <TableTitle title={`Danh sách vi phạm của người dùng ${violationsOfUser[0].userId.fullname}`} path='/admin/violation/reported' />
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
              <TableCell style={{ width: '120px' }}>
                <BlockUnlockButton isSet status={status} setStatus={setStatus} userId={userId} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredViolationOfUser?.length > 0 ? (
              filteredViolationOfUser
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((userViolation, index) => (
                  <UserViolationRow key={userViolation._id} userViolation={userViolation} serialNumber={page * rowsPerPage + index + 1} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  Không tìm thấy nội dung tìm kiếm
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[4, 5, 6]}
          component='div'
          count={filteredViolationOfUser.length}
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

export default UserViolets
