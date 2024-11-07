import React, { useEffect, useState } from 'react'
import { Grid, Card, Typography } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import { statisticAPI } from '@/apis/statistic/statisticAPI'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] // Màu sắc cho biểu đồ tròn

const ChartSection = () => {
  const [dataPie, setDataPie] = useState([]) // Dữ liệu cho biểu đồ tròn
  const [dataBar, setDataBar] = useState([]) // Dữ liệu cho biểu đồ cột

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { stats } = await statisticAPI()

        // Cấu trúc dữ liệu cho biểu đồ tròn hiển thị các số liệu về người dùng
        setDataPie([
          { name: 'Tổng số người dùng', value: stats.totalUsers },
          { name: 'Người dùng mới trong tháng', value: stats.newUsersThisMonth },
          { name: 'Người dùng bị khóa', value: stats.totalBannedUsers }
        ])

        // Cấu trúc dữ liệu cho biểu đồ cột hiển thị phần trăm tăng trưởng
        setDataBar([
          { name: 'Người dùng mới', visits: parseFloat(stats.growthNewUsers) },
          { name: 'Bài đăng', visits: parseFloat(stats.growthTotalPosts) },
          { name: 'Người dùng bị khóa', visits: parseFloat(stats.growthBannedUsers) }
        ])
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={3} mt={5}>
      {/* Biểu đồ tròn hiển thị số liệu về người dùng */}
      <Grid item xs={6}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Thống kê người dùng</Typography>
          <PieChart width={400} height={200}>
            <Pie data={dataPie} dataKey='value' outerRadius={80} fill='#8884d8'>
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>
      </Grid>

      {/* Biểu đồ cột hiển thị phần trăm tăng trưởng */}
      <Grid item xs={6}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Tăng trưởng</Typography>
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='visits' fill='#82ca9d' />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ChartSection
