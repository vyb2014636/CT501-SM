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
import TableTitle from '@/components/Admin/Title/TableTitle'

const UsersTable = ({ history }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetchListUserForAdmin()
        setUsers(response.users)
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchUsers()

    // Khôi phục trạng thái từ localStorage
    // const savedEditMode = localStorage.getItem('editMode')

    // const savedUser = JSON.parse(localStorage.getItem('selectedUser'))

    // if (savedEditMode && savedUser) {
    //   setEditMode(JSON.parse(savedEditMode))
    //   setSelectedUser(savedUser)
    // }
  }, [])

  if (loading) return <Typography>Loading....</Typography>

  if (!loading && !users.length) return <Typography>Không có dữ liệu</Typography>

  const filteredUsers = users.filter((user) => user.fullname.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <TableTitle title='Danh sách người dùng' />

      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <InputBase
          placeholder='Tìm kiếm'
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
              <TableCell style={{ width: '100px' }}>Avatar</TableCell>
              <TableCell style={{ width: '200px' }}>Họ tên</TableCell>
              <TableCell style={{ width: '200px' }}>Địa chỉ </TableCell>
              <TableCell style={{ width: '150px' }}>Vai trò</TableCell>
              <TableCell style={{ width: '150px', textAlign: 'center' }}>Xác thực</TableCell>
              <TableCell style={{ width: '150px', textAlign: 'center' }}>Trạng thái</TableCell>
              <TableCell style={{ width: '150px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.length > 0 ? (
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <UserTableRow key={user.id} user={user} serialNumber={page * rowsPerPage + index + 1} history={history} setUsers={setUsers} />
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
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage='Số dòng trên trang'
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`}
      />
    </>
  )
}

export default UsersTable
