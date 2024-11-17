import { getStatisticsDetailsAPI } from '@/apis/statistic/statisticAPI'
import React, { useEffect, useState } from 'react'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import OutlinedInput from '@mui/material/OutlinedInput'
import CircularProgress from '@mui/material/CircularProgress'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import UserTableRow from '@/components/Admin/Table/UserTableRow'

const BannedUser = () => {
  const [totalUsers, setTotalUsers] = useState([]) // Lưu trữ danh sách người dùng
  const [month, setMonth] = useState('') // Tháng đã chọn
  const [year, setYear] = useState('') // Năm đã chọn
  const [loading, setLoading] = useState(true) // Trạng thái loading
  const [isFetchingMore, setIsFetchingMore] = useState(false) // Trạng thái fetching thêm dữ liệu
  const [page, setPage] = useState(0) // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Số dòng trên mỗi trang
  const [availableMonths, setAvailableMonths] = useState([]) // Danh sách các tháng có dữ liệu

  const fetchTotalUser = async () => {
    setLoading(true) // Bắt đầu loading
    try {
      const totalUserResponse = await getStatisticsDetailsAPI('bannedUsers')

      // Lấy dữ liệu từ response
      setTotalUsers(totalUserResponse.stats.bannedUsersThisMonth || [])

      // Lọc các tháng có dữ liệu từ blockDate
      const monthsWithData = totalUserResponse.stats.allBannedUsers.reduce((months, user) => {
        const userDate = new Date(user.blockDate)
        const year = userDate.getFullYear()
        const month = userDate.getMonth() + 1 // Tháng bắt đầu từ 0
        const monthKey = `${year}-${month}` // Dùng year-month để tạo key duy nhất cho tháng

        if (!months[monthKey]) {
          months[monthKey] = { year, month }
        }

        return months
      }, {})

      const availableMonthsList = Object.values(monthsWithData)
      setAvailableMonths(availableMonthsList)

      const lastMonthData = availableMonthsList[availableMonthsList.length - 1]
      setMonth(lastMonthData.month)
      setYear(lastMonthData.year)
    } catch (error) {
      console.log('Error:', error.message)
    } finally {
      setLoading(false) // Kết thúc loading
    }
  }

  // Lấy thống kê người dùng theo tháng và năm
  const fetchLoadTotalUser = async (selectedMonth, selectedYear) => {
    setIsFetchingMore(true) // Bắt đầu fetching thêm
    try {
      const totalUserResponse = await getStatisticsDetailsAPI('bannedUsers', selectedMonth, selectedYear)
      setTotalUsers(totalUserResponse.stats.bannedUsersThisMonth || [])

      setMonth(selectedMonth)
      setYear(selectedYear)
    } catch (error) {
      console.log('Error:', error.message)
    } finally {
      setIsFetchingMore(false) // Kết thúc fetching thêm
    }
  }

  // Khi người dùng chọn tháng hoặc năm
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value
    setPage(0) // Đặt lại trang về 0 khi tháng thay đổi
    fetchLoadTotalUser(selectedMonth, year) // Gọi API lại khi tháng thay đổi
  }

  const handleYearChange = (event) => {
    const selectedYear = event.target.value
    setPage(0) // Đặt lại trang về 0 khi năm thay đổi
    fetchLoadTotalUser(month, selectedYear) // Gọi API lại khi năm thay đổi
  }

  // Lấy dữ liệu lại khi month hoặc year thay đổi
  useEffect(() => {
    fetchTotalUser()
  }, [])

  // Lọc các tháng theo năm đã chọn
  const generateMonths = () => {
    return availableMonths
      .filter((item) => item.year === year) // Lọc tháng theo năm
      .map((item) => item.month) // Trả về danh sách các tháng của năm
  }

  // Lấy danh sách năm có dữ liệu
  const generateYears = () => {
    const years = Array.from(new Set(availableMonths.map((item) => item.year))) // Lấy các năm duy nhất
    return years
  }

  return (
    <div>
      {/* Hiển thị hiệu ứng loading cho toàn bộ component */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <>
          <Typography variant='h5' gutterBottom fontWeight='bold' align='center'>
            Thống kê danh sách người dùng theo tháng
          </Typography>
          <Box mb={3}>
            <Typography variant='h6' color='textSecondary'>
              {totalUsers?.length > 0 ? `Tổng người dùng trong ${month}/${year}: ${totalUsers.length}` : 'Không có dữ liệu '}
            </Typography>
          </Box>

          {/* Chọn Tháng và Năm */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant='outlined'>
                <Select
                  value={month}
                  onChange={handleMonthChange}
                  input={<OutlinedInput />}
                  MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}>
                  {generateMonths().map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant='outlined'>
                <Select
                  value={year}
                  onChange={handleYearChange}
                  input={<OutlinedInput />}
                  MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}>
                  {generateYears().map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Hiển thị bảng người dùng */}
          <Grid container spacing={3}>
            {isFetchingMore ? (
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ padding: 3, boxShadow: 3 }}>
                  <CircularProgress color='primary' />
                </Card>
              </Grid>
            ) : totalUsers.length > 0 ? (
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'background.default' }}>
                        <TableCell style={{ width: '100px' }} align='center'>
                          Thứ tự
                        </TableCell>
                        <TableCell style={{ width: '100px' }}>Avatar</TableCell>
                        <TableCell style={{ width: '200px' }}>Họ tên</TableCell>
                        <TableCell style={{ width: '200px' }}>Địa chỉ</TableCell>
                        <TableCell style={{ width: '150px' }}>Vai trò</TableCell>
                        <TableCell style={{ width: '150px', textAlign: 'center' }}>Xác thực</TableCell>
                        <TableCell style={{ width: '150px', textAlign: 'center' }}>Trạng thái</TableCell>
                        <TableCell style={{ width: '150px' }} />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {totalUsers.map((user, index) => (
                        <UserTableRow key={user.id} user={user} serialNumber={index + 1} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component='div'
                  count={totalUsers.length}
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
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Card sx={{ padding: 3, boxShadow: 3 }}>
                  <Typography variant='h6' color='textSecondary' align='center'>
                    Không có người dùng nào bị khóa
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </div>
  )
}

export default BannedUser
