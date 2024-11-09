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

      {/* Dialog to show image details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ ...scrollbarStyleMui }}>
          <Box
            component='img'
            src={selectedImage}
            alt='Image detail'
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ImagesTab
