import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline' // Biểu tượng phát
import ModalMedia from '@/components/Modal/ModalMedia'
import Masonry from '@mui/lab/Masonry'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const renderMedia = (post) => {
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
  return (
    <>
      {mediaCount < 3 && (
        <Masonry columns={mediaCount === 1 ? 1 : 2} sx={{ mx: 0 }} spacing={2}>
          {media?.slice(0, 3).map((image, index) => (
            <Box sx={{ position: 'relative', overflow: 'hidden', m: 0, cursor: 'pointer' }}>
              {image.isVideo ? (
                <CardMedia
                  component='video'
                  onLoad='lazy'
                  src={image.url}
                  sx={{ width: '100%', objectFit: 'cover', height: '100%' }}
                  onClick={() => handleOpenModal(index)}
                  controls
                />
              ) : (
                <CardMedia
                  loading='lazy'
                  component='img'
                  image={image.url}
                  alt={`Post image ${index + 1}`}
                  sx={{ width: '100%', objectFit: 'cover', height: '100%' }}
                  onClick={() => handleOpenModal(index)}
                />
              )}
            </Box>
          ))}
        </Masonry>
      )}
      {/* Phần hiển thị 3 ảnh đầu tiên với 3 cột */}
      {mediaCount >= 3 && (
        <Masonry columns={3} sx={{ m: 0 }}>
          {media?.slice(0, 3).map((image, index) => (
            <Box key={index} sx={{ position: 'relative', overflow: 'hidden', m: 0, cursor: 'pointer' }}>
              {image.isVideo ? (
                <CardMedia
                  component='video'
                  src={image.url}
                  sx={{ width: '100%', objectFit: 'fill', height: '240px' }}
                  onClick={() => handleOpenModal(index)}
                />
              ) : (
                <CardMedia
                  loading='lazy'
                  component='img'
                  image={image.url}
                  alt={`Post image ${index + 1}`}
                  sx={{ width: '100%', objectFit: 'fill', height: '240px' }}
                  onClick={() => handleOpenModal(index)}
                />
              )}
            </Box>
          ))}
        </Masonry>
      )}

      {/* Phần hiển thị 2 ảnh cuối với 2 cột */}
      {mediaCount > 3 && (
        <Masonry columns={mediaCount === 4 ? 1 : 2} sx={{ mx: 0 }}>
          {media?.slice(3, 5).map((image, index) => (
            <Box key={index + 3} sx={{ position: 'relative', overflow: 'hidden', m: 0, cursor: 'pointer' }}>
              {image?.isVideo ? (
                <CardMedia
                  component='video'
                  src={image.url}
                  sx={{ width: '100%', objectFit: 'fill', height: mediaCount === 4 ? '300px' : '240px' }}
                  onClick={() => handleOpenModal(index + 3)}
                />
              ) : (
                <CardMedia
                  loading='lazy'
                  component='img'
                  image={image.url}
                  alt={`Post image ${index + 1}`}
                  sx={{ width: '100%', objectFit: 'fill', height: mediaCount === 4 ? '300px' : '240px' }}
                  onClick={() => handleOpenModal(index + 3)}
                />
              )}
              {mediaCount > 5 && index === 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleOpenModal(index + 3)}>
                  <Typography variant='h4' color='white'>
                    +{mediaCount - 5}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Masonry>
      )}
      <ModalMedia
        open={openModal}
        handleClose={() => setOpenModal(false)}
        media={media}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  )
}

export default renderMedia
