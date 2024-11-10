import ModalMedia from '@/components/Common/Modal/ModalMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

const MediaPostCard = (post) => {
  const [openModal, setOpenModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOpenModal = (index) => {
    setCurrentIndex(index)
    setOpenModal(true)
  }

  const videos = post?.videos ? post.videos.map((videoUrl) => ({ url: videoUrl, isVideo: true })) : []
  const images = post?.images ? post.images.map((imageUrl) => ({ url: imageUrl, isVideo: false })) : []

  let media = [...images, ...videos]
  const mediaCount = media?.length

  // Số lượng ảnh cần hiển thị, tối đa 5 ảnh
  const displayedMedia = media?.slice(0, 5)

  return (
    displayedMedia?.length > 0 && (
      <CardMedia>
        {/* Wrapping media items inside a Box to manage the 3-column layout */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap', // Cho phép các ảnh tự động xuống hàng
            gap: 2,
            width: 1,
            height: displayedMedia?.length === 2 || displayedMedia?.length === 3 ? '300px' : '500px',
            maxHeight: displayedMedia?.length === 2 || displayedMedia?.length === 3 ? '300px' : '500px'
          }}>
          {displayedMedia?.map((item, index) => (
            <Item
              key={index}
              sx={{
                position: 'relative',
                flex: 'calc(32.333%)',
                height: displayedMedia?.length > 3 ? '240px' : 1,
                '&:hover': {
                  filter: 'brightness(0.9)',
                  transition: 'filter 0.3s ease'
                }
              }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  objectFit: 'fill',
                  width: 1,
                  height: 1,
                  border: '1px solid rgba(0, 0, 0, 0.1)' // Thêm border nhẹ
                }}
                component={item.isVideo ? 'video' : 'img'}
                src={item.url}
                controls={item.isVideo}
                loading='lazy'
                onClick={() => handleOpenModal(index)}
              />

              {mediaCount > 5 && index === 4 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleOpenModal(4)}>
                  <Typography variant='h4' color='white'>
                    +{mediaCount - 5} {/* Display the number of additional media items */}
                  </Typography>
                </Box>
              )}
            </Item>
          ))}
        </Box>

        {/* Modal to display media in full screen */}
        <ModalMedia
          open={openModal}
          handleClose={() => setOpenModal(false)}
          media={media}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </CardMedia>
    )
  )
}

export default MediaPostCard
