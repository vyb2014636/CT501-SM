import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TitleModal from '@components/Common/Modal/Title/TitleModal'
import HiddenTextField from '@components/Common/TextField/HiddenTextField'
import { styleModal } from '@/styles/styles'
import getCroppedImg from '@/utils/getCroppedImg'
import { uploadAvatar } from '@/apis/user/userAPI'
import { updateUser } from '@/features/auth/authSlice'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const EditAvatarModal = ({ openModal, setOpenModal }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPreview, setCropPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCloseModal = () => {
    if (selectedImage) {
      const confirmClose = window.confirm('Bạn có muốn bỏ ảnh đã chọn không?')
      if (confirmClose) {
        resetModal()
      }
    } else {
      resetModal()
    }
  }

  const resetModal = () => {
    setOpenModal(false)
    setCropPreview(null)
    setSelectedImage(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      getCroppedImg(selectedImage, croppedAreaPixels).then((croppedImage) => {
        setCropPreview(croppedImage)
      })
    },
    [selectedImage]
  )

  const handleUpload = async () => {
    setLoading(true)
    const blob = await fetch(cropPreview).then((r) => r.blob())
    const formData = new FormData()
    formData.append('avatar', blob)
    dispatch(openBackdrop())

    try {
      const response = await uploadAvatar(formData)
      dispatch(updateUser(response.user))
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      resetModal()
      setLoading(false) // Stop loading
      dispatch(closeBackdrop())
    }
  }

  return (
    <Modal open={openModal} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={{ ...styleModal, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TitleModal title='Chỉnh sửa ảnh đại diện' />
        <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Chọn ảnh đại diện
          <HiddenTextField type='file' accept='image/*' onChange={handleImageChange} />
        </Button>

        {selectedImage && (
          <Box sx={{ position: 'relative', width: '100%', height: '200px', mt: 2 }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape='round'
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </Box>
        )}

        {cropPreview && (
          <>
            <Box
              component='img'
              src={cropPreview}
              alt='Cropped Avatar'
              sx={{
                mt: 2,
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid',
                borderColor: 'background.paper'
              }}
            />
            <Button variant='contained' onClick={handleUpload} sx={{ mt: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Lưu ảnh'} {/* Show spinner if loading */}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default EditAvatarModal
