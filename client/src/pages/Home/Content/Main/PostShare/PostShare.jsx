import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlexRow from '@/components/Flex/FlexRow'
import { useSelector } from 'react-redux'
import { formatFullname } from '@/utils/helpers'
import ModalShare from '@/components/Share/ModalShare'

const PostShare = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: '12px', p: 4, gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3 }}>
        <FlexRow>
          <Avatar alt={formatFullname(user?.firstname, user?.lastname)} src={user.avatar} sx={{ width: 48, height: 48 }} />
          {/* <Typography >
            Hãy nêu lên suy nghĩ của bạn
          </Typography> */}
          <ModalShare />
        </FlexRow>
        <Divider />
        <FlexRow justifyContent='end'>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <PhotoOutlinedIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Hình ảnh
            </Typography>
          </Button>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <PlayCircleOutlineIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Video
            </Typography>
          </Button>
          <Button sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <LocationOnOutlinedIcon color='primary' size='small' />
            <Typography color='primary' fontWeight='bold'>
              Vị trí
            </Typography>
          </Button>
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
