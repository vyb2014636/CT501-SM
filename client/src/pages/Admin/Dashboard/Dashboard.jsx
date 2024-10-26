import React from 'react'
import DashboardStats from './Component/DashboardStats'
import ChartSection from './Component/ChartSection'
import { Box, Typography } from '@mui/material'

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <Box sx={{ padding: 4 }}>
        <Typography variant='h4'>Hi, Chào mừng bạn 👋</Typography>
      </Box>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts */}
      <ChartSection />
    </>
  )
}

export default Dashboard
