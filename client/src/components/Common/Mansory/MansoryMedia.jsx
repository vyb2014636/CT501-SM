import ModalMedia from '@/components/Modal/ModalMedia'
import Masonry from '@mui/lab/Masonry'
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
        <Masonry columns={mediaCount === 1 ? 1 : 2} sx={{ mx: 0 }} spacing={0}>
          {media?.slice(0, 3).map((image, index) => (
            <Box key={index} sx={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', mr: '2px' }}>
              {image.isVideo ? (
                <video
                  src={image.url}
                  style={{ width: '100%', objectFit: 'cover', height: '100%', cursor: 'pointer' }}
                  controls
                  onClick={() => handleOpenModal(index)}
                />
              ) : (
                <img
                  src={image.url}
                  alt={`Post image ${index + 1}`}
                  style={{ width: '100%', objectFit: 'cover', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleOpenModal(index)}
                />
              )}
            </Box>
          ))}
        </Masonry>
      )}
      {/* Phần hiển thị 3 ảnh đầu tiên với 3 cột */}
      {mediaCount >= 3 && (
        <Masonry columns={3} sx={{ maxHeigh: '250px', my: '2px' }} spacing={0}>
          {media?.slice(0, 3).map((image, index) => (
            <Box key={index} sx={{ position: 'relative', overflow: 'hidden', px: '2px', cursor: 'pointer', height: '100%' }}>
              {image.isVideo ? (
                <video
                  src={image.url}
                  style={{ width: '100%', objectFit: 'fill', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleOpenModal(index)}
                />
              ) : (
                <img
                  src={image.url}
                  alt={`Post image ${index + 1}`}
                  style={{ width: '100%', objectFit: 'fill', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleOpenModal(index)}
                />
              )}
            </Box>
          ))}
        </Masonry>
      )}

      {/* Phần hiển thị 2 ảnh cuối với 2 cột */}
      {mediaCount > 3 && (
        <Masonry columns={mediaCount === 4 ? 1 : 2} spacing={0} sx={{ maxHeigh: '250px' }}>
          {media?.slice(3, 5).map((image, index) => (
            <Box key={index + 3} sx={{ position: 'relative', overflow: 'hidden', px: '2px', cursor: 'pointer', height: '100%' }}>
              {image?.isVideo ? (
                <video
                  src={image.url}
                  style={{ width: '100%', objectFit: 'fill', height: mediaCount === 4 ? '300px' : '240px', cursor: 'pointer' }}
                  onClick={() => handleOpenModal(index + 3)}
                />
              ) : (
                <img
                  src={image.url}
                  alt={`Post image ${index + 1}`}
                  style={{ width: '100%', objectFit: 'fill', height: mediaCount === 4 ? '300px' : '240px', cursor: 'pointer' }}
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
