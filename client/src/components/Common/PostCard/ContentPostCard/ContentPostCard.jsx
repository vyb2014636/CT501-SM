import React from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ContentPostCard = ({ describe }) => {
  return (
    <CardContent sx={{ py: 2 }}>
      <Typography
        variant='body1'
        sx={{
          whiteSpace: 'pre-wrap'
        }}>
        {describe}
      </Typography>
    </CardContent>
  )
}

export default ContentPostCard
