import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'

const MiniPostCard = ({ post }) => {
  return (
    <Card sx={{ width: 'calc(25% - 8px)', height: 200 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={post.images[0] || 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'}
          alt='green iguana'
        />
        <CardContent>
          <Typography variant='body2'>{post.describe}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MiniPostCard
