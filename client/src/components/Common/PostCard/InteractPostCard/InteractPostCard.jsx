import React, { useCallback } from 'react'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import CommentButton from '../../Comment/CommentButton'
import ShareButton from '@/components/Share/Button/ShareButton'

const InteractPostCard = ({ isLiked, handleClickLike, styleThreeButton, post }) => {
  const memoizedHandleClickLike = useCallback(() => {
    handleClickLike()
  }, [handleClickLike])

  return (
    <CardActions disableSpacing sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }} width='100%'>
        <Button sx={styleThreeButton} onClick={memoizedHandleClickLike}>
          {isLiked ? <ThumbUpIcon color='primary' /> : <ThumbUpOffAltIcon color='primary' />}
          <Typography variant='body1' fontWeight='bold'>
            Thích
          </Typography>
        </Button>

        <CommentButton post={post} />

        <ShareButton post={post} />
      </Box>
    </CardActions>
  )
}

export default InteractPostCard
