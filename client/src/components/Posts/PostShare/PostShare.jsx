import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import React from 'react'
import FlexBetween from '@/components/Flex/FlexBetween'
import FlexRow from '@/components/Flex/FlexRow'

const PostShare = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: '12px', p: 4, gap: 3 }}>
      <Avatar alt='Remy Sharp' src='@/img/imgF1.png' sizes='' />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3 }}>
        <TextField
          size='small'
          fullWidth
          sx={{
            bgcolor: 'neutral.primary',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none' // Tắt border
              },
              '&:hover fieldset': {
                border: 'none' // Tắt border khi hover
              },
              '&.Mui-focused fieldset': {
                border: 'none' // Tắt border khi focus
              }
            }
          }}
          label='Bạn đang nghĩ gì'
        />
        <FlexRow sx={{ justifyContent: 'start' }}>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhotoOutlinedIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Hình ảnh
            </Typography>
          </Button>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PlayCircleOutlineIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Video
            </Typography>
          </Button>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnOutlinedIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Vị trí
            </Typography>
          </Button>
          <Button variant='contained' sx={{ ml: 'auto' }}>
            {/* {loading ? 'uploading...' : 'Share'} */}Chia sẻ
          </Button>
          {/* <div style={{ display: 'none' }}>
            <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
          </div> */}
        </FlexRow>

        {/* {image && (
                    <div className="previewImage">
                        <CloseOutlinedIcon onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )} */}
      </Box>
    </Box>
  )
}

export default PostShare
