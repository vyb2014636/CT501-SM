import React, { useCallback } from 'react'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ButtonComment from '@/components/Common/Post/PostInteract/Button/ButtonComment'

const PostInteract = ({ isLiked, handleClickLike, styleThreeButton, post }) => {
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

        <ButtonComment post={post} />

        <Button sx={styleThreeButton}>
          <ShareIcon />
          <Typography variant='body1' fontWeight='bold'>
            Chia sẻ
          </Typography>
        </Button>
      </Box>
    </CardActions>
  )
}

export default PostInteract
