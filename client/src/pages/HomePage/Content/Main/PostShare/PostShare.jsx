import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import avatar from '@/img/imgF1.png'

import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlexRow from '@/components/Flex/FlexRow'

const PostShare = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: '12px', p: 4, gap: 3 }}>
      <Avatar alt='Remy Sharp' src={avatar} sx={{ width: 48, height: 48 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3 }}>
        <InputBase
          placeholder='Hãy nêu lên suy nghĩ của bạn'
          fullWidth
          sx={{ ml: 2, backgroundColor: 'neutral.primary', borderRadius: '12px', padding: 2 }}
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
