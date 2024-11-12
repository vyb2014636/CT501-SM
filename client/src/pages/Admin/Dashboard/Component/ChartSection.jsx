import React, { useEffect, useState } from 'react'
import { Grid, Card, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { statisticAPI } from '@/apis/statistic/statisticAPI' // API của bạn

// Màu sắc cho biểu đồ tròn
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const ChartSection = () => {
  const [dataPie, setDataPie] = useState([]) // Dữ liệu cho biểu đồ tròn
  const [dataBar, setDataBar] = useState([]) // Dữ liệu cho biểu đồ cột

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { stats } = await statisticAPI() // Gọi API để lấy dữ liệu thống kê

        // Cập nhật dữ liệu cho biểu đồ tròn
        setDataPie([
          { name: 'Tổng số người dùng', value: stats.totalUsers },
          { name: 'Người dùng mới trong tháng', value: stats.newUsersThisMonth },
          { name: 'Người dùng bị khóa', value: stats.totalBannedUsers }
        ])

        // Cập nhật dữ liệu cho biểu đồ cột
        setDataBar([
          { name: 'Người dùng mới', reduce: parseFloat(stats.growthNewUsers), isGrowth: parseFloat(stats.growthNewUsers) >= 0 },
          { name: 'Bài đăng', reduce: parseFloat(stats.growthTotalPosts), isGrowth: parseFloat(stats.growthTotalPosts) >= 0 },
          { name: 'Người dùng bị khóa', reduce: parseFloat(stats.growthBannedUsers), isGrowth: parseFloat(stats.growthBannedUsers) >= 0 }
        ])
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }

    fetchData()
  }, [])

  // Tạo custom Tooltip để hiển thị phần trăm tăng hoặc giảm
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, reduce, isGrowth } = payload[0].payload
      return (
        <Box sx={{ backgroundColor: 'white', padding: 1, borderRadius: 1, boxShadow: 2 }}>
          <Typography variant='body2'>{name}</Typography>
          <Typography variant='h6'>
            {isGrowth ? '+' : '-'}
            {Math.abs(reduce)}%
          </Typography>
        </Box>
      )
    }

    return null
  }

  return (
    <Grid container spacing={3} mt={5} sx={{ height: 400 }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Card sx={{ padding: 3, boxShadow: 3, height: '100%' }}>
          <Typography variant='h6' gutterBottom>
            Thống kê người dùng
          </Typography>
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ height: '100%' }}>
            {/* Biểu đồ tròn nằm bên trái */}
            <Box flex={1} display='flex' justifyContent='center'>
              <PieChart width={250} height={250}>
                <Pie data={dataPie} dataKey='value' outerRadius={100} fill='#8884d8' label>
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>

            {/* Legend nằm bên phải */}
            <Box flex={1} display='flex' flexDirection='column' justifyContent='space-evenly' padding={2}>
              {dataPie.map((entry, index) => (
                <Box key={index} display='flex' alignItems='center' mb={1}>
                  <Box sx={{ backgroundColor: COLORS[index % COLORS.length], width: 20, height: 20, marginRight: 2 }} />
                  <Typography variant='body2'>
                    {entry.name}: {entry.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Biểu đồ cột hiển thị phần trăm tăng trưởng */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Card sx={{ padding: 3, boxShadow: 3, height: '100%' }}>
          <Typography variant='h6' gutterBottom>
            Tăng trưởng
          </Typography>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='reduce' fill='#82ca9d' barSize={60} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ChartSection
