import React, { useEffect, useState } from 'react'
import { Grid, Card, Typography } from '@mui/material'
import { statisticAPI } from '@/apis/statistic/statisticAPI'
import { toast } from 'react-toastify'

const DashboardStats = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: '',
    growthTotalUsers: '',
    newUsersThisMonth: '',
    growthNewUsers: '',
    totalPosts: '',
    growthTotalPosts: '',
    totalBannedUsers: '',
    growthBannedUsers: ''
  })

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const response = await statisticAPI()
        setStats(response.stats)
      } catch (error) {
        toast.error(error.message)
        setError(true)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) return <Typography>Đang tải</Typography>
  if (error) return <Typography>Lỗi</Typography>

  return (
    <Grid container spacing={3} mt={3}>
      {/* Weekly Sales */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Số lượng người dùng</Typography>
          <Typography variant='h4'>{stats.totalUsers}</Typography>
          <Typography variant='body2'>+{stats.growthTotalUsers}</Typography>
        </Card>
      </Grid>

      {/* New Users */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Những người dùng mới trong tháng</Typography>
          <Typography variant='h4'>{stats.newUsersThisMonth}</Typography>
          <Typography variant='body2'>{stats.growthNewUsers}</Typography>
        </Card>
      </Grid>

      {/* Purchase Orders */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Tổng số lượng bài đăng</Typography>
          <Typography variant='h4'>{stats.totalPosts}</Typography>
          <Typography variant='body2'>+{stats.growthTotalPosts}</Typography>
        </Card>
      </Grid>

      {/* Messages */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Số lượng bị khóa </Typography>
          <Typography variant='h4'>{stats.totalBannedUsers}</Typography>
          <Typography variant='body2'>+{stats.growthBannedUsers}</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardStats
