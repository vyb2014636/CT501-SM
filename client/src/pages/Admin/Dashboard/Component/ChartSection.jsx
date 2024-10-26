import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const dataPie = [
  { name: 'Team A', value: 43.8 },
  { name: 'Team B', value: 18.8 },
  { name: 'Team C', value: 6.3 }
]

const dataBar = [
  { name: 'January', visits: 30 },
  { name: 'February', visits: 45 },
  { name: 'March', visits: 60 },
  { name: 'April', visits: 80 }
]

const ChartSection = () => {
  return (
    <Grid container spacing={3} mt={5}>
      <Grid item xs={6}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Current Visits</Typography>
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

      <Grid item xs={6}>
        <Card sx={{ padding: 3 }}>
          <Typography variant='h6'>Website Visits</Typography>
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
