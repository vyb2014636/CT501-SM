import React from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ShareIcon from '@mui/icons-material/Share'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'

const PostContent = ({ describe }) => {
  return (
    <CardContent>
      <Typography variant='body1'>{describe}</Typography>
    </CardContent>
  )
}

export default PostContent
