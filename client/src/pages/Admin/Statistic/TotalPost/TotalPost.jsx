import { getStatisticsDetailsAPI } from '@/apis/statistic/statisticAPI'
import React, { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Box,
  CircularProgress,
  CardMedia,
  CardContent,
  InputLabel
} from '@mui/material'
import bgDF from '@/assets/backgroundDefault.jpg'

const TotalPost = () => {
  const [totalPosts, setTotalPosts] = useState([]) // Lưu trữ danh sách bài viết
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [availableMonths, setAvailableMonths] = useState([]) // Lưu trữ các tháng có bài viết
  const [loading, setLoading] = useState(true) // Trạng thái loading
  const [isFetchingMore, setIsFetchingMore] = useState(false) // Trạng thái loading

  const fetchTotalPosts = async () => {
    setLoading(true) // Bắt đầu loading
    try {
      const totalPostResponse = await getStatisticsDetailsAPI('posts')

      // Lấy dữ liệu từ response
      setTotalPosts(totalPostResponse.stats.postsThisMonth || [])

      // Lọc các tháng có dữ liệu từ createdAt
      const monthsWithData = totalPostResponse.stats.allPosts.reduce((months, post) => {
        const postDate = new Date(post.createdAt)
        const year = postDate.getFullYear()
        const month = postDate.getMonth() + 1 // Tháng bắt đầu từ 0
        const monthKey = `${year}-${month}` // Dùng year-month để tạo key duy nhất cho tháng

        if (!months[monthKey]) {
          months[monthKey] = { year, month }
        }

        return months
      }, {})

      const availableMonthsList = Object.values(monthsWithData)
      setAvailableMonths(availableMonthsList)

      const lastMonthData = availableMonthsList[availableMonthsList.length - 1]

      // setMonth(lastMonthData.month)

      // Kiểm tra nếu không có tháng nào cho năm, đặt tháng là "Chọn tháng"
      if (availableMonthsList.length === 0) {
        setMonth('') // Không có tháng nào cho năm, đặt chọn tháng
      } else {
        setMonth(lastMonthData.month) // Gán tháng mặc định nếu có tháng
      }
      setYear(lastMonthData.year)
    } catch (error) {
      console.log('Error:', error.message)
    } finally {
      setLoading(false) // Kết thúc loading
    }
  }

  const fetchLoadTotalPosts = async (selectedMonth, selectedYear) => {
    setIsFetchingMore(true) // Bắt đầu loading
    try {
      const totalPostResponse = await getStatisticsDetailsAPI('posts', selectedMonth, selectedYear)

      setTotalPosts(totalPostResponse.stats.postsThisMonth || [])

      setMonth(selectedMonth)
      setYear(selectedYear)
    } catch (error) {
      console.log('Error:', error.message)
    } finally {
      setIsFetchingMore(false) // Kết thúc loading
    }
  }

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value
    fetchLoadTotalPosts(selectedMonth, year) // Gọi API lại khi tháng thay đổi
  }

  const handleYearChange = (event) => {
    const selectedYear = event.target.value
    fetchLoadTotalPosts(month, selectedYear) // Gọi API lại khi năm thay đổi
  }

  // Lấy dữ liệu lại khi month hoặc year thay đổi
  useEffect(() => {
    fetchTotalPosts()
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
            Thống kê bài viết theo tháng
          </Typography>
          <Box mb={3}>
            <Typography variant='h6' color='textSecondary'>
              {totalPosts?.length > 0 ? `Tổng bài viết trong ${month}/${year}: ${totalPosts.length}` : 'Không có dữ liệu?'}
            </Typography>
          </Box>

          {/* Chọn Tháng và Năm */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel id='demo-simple-select-label-month'>Tháng</InputLabel>

                <Select
                  labelId='demo-simple-select-label-month'
                  id='demo-simple-select-month'
                  label='Tháng'
                  value={month}
                  onChange={handleMonthChange}
                  MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}>
                  {generateMonths().length > 0 ? (
                    generateMonths().map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value=''>Chọn tháng</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label-year'>Năm</InputLabel>

                <Select
                  labelId='demo-simple-select-label-year'
                  id='demo-simple-select-year'
                  label='Năm'
                  value={year}
                  onChange={handleYearChange}
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

          {/* Hiển thị card bài viết */}
          <Grid container spacing={3}>
            {isFetchingMore ? (
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ padding: 3, boxShadow: 3 }}>
                  <CircularProgress color='primary' />
                </Card>
              </Grid>
            ) : totalPosts.length > 0 ? (
              totalPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card>
                    <CardMedia component='img' alt='green iguana' height='140' image={post?.images[0] || bgDF} sx={{ outline: 1 }} />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {post?.byPost.fullname}
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {post?.describe || 'Không có mô tả'}
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
                        {new Date(post.createdAt).toLocaleString('vi-VN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card sx={{ padding: 3, boxShadow: 3 }}>
                  <Typography variant='h6' color='textSecondary'>
                    Không tìm thấy bài viết trong tháng
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

export default TotalPost
