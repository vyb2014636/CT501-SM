import * as React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Masonry from '@mui/lab/Masonry'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { scrollbarStyleMui } from '@/styles/styles'
import { useState } from 'react'
import ModalWrapper from '../../Modal/ModalWrapper'
import { ArrowBack, ArrowForward, Close } from '@mui/icons-material'
import FlexCenter from '../../Flex/FlexCenter'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: '#1A2027'
  })
}))

const ImagesTab = ({ posts }) => {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleClickOpen = (image) => {
    setSelectedImage(image)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const imagesArray = posts.flatMap((post) => post.images)
  return (
    <Box sx={{ width: 1 }}>
      {/* If no images are found */}
      {imagesArray?.length === 0 ? (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Typography variant='body1'>Không có ảnh trong bài viết</Typography>
        </Box>
      ) : (
        // Display the images in Masonry if there are any
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {imagesArray.map((image, imgIndex) => (
            <Item key={`${imgIndex}`}>
              <Box
                component='img'
                src={image}
                alt={`Post Image ${imgIndex}`}
                sx={{
                  width: 1,
                  height: 'auto',
                  borderRadius: 1,
                  display: 'block',
                  cursor: 'pointer'
                }}
                onClick={() => handleClickOpen(image)}
              />
            </Item>
          ))}
        </Masonry>
      )}
      <ModalWrapper title='Ảnh' open={open} onClose={handleClose} height={600}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Close />
        </IconButton>
        <FlexCenter height={1} width={1}>
          <Box
            sx={{
              objectFit: 'contain',
              height: 1,
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            component='img'
            src={selectedImage}
            loading='lazy'
          />
        </FlexCenter>
      </ModalWrapper>
    </Box>
  )
}

export default ImagesTab
