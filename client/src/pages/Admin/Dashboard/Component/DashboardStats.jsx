import React from 'react'
import { Grid, Card, Typography } from '@mui/material'

const DashboardStats = () => {
  const stats = {
    weeklySales: '714k',
    newUsers: '1.35m',
    purchaseOrders: '1.72m',
    messages: 234
  }

  return (
    <Grid container spacing={3} mt={3}>
      {/* Weekly Sales */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Số lượng người dùng</Typography>
          <Typography variant='h4'>{stats.weeklySales}</Typography>
          <Typography variant='body2'>+2.6%</Typography>
        </Card>
      </Grid>

      {/* New Users */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Những người dùng mới</Typography>
          <Typography variant='h4'>{stats.newUsers}</Typography>
          <Typography variant='body2'>-0.1%</Typography>
        </Card>
      </Grid>

      {/* Purchase Orders */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Tổng số lượng bài đăng</Typography>
          <Typography variant='h4'>{stats.purchaseOrders}</Typography>
          <Typography variant='body2'>+2.8%</Typography>
        </Card>
      </Grid>

      {/* Messages */}
      <Grid item xs={3}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Số lượng bị khóa </Typography>
          <Typography variant='h4'>{stats.messages}</Typography>
          <Typography variant='body2'>+3.6%</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DashboardStats
