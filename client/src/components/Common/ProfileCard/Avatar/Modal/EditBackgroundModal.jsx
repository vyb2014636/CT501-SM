import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import FlexRow from '@components/Common/Flex/FlexRow'
import HiddenTextField from '@components/Common/TextField/HiddenTextField'

import { styleModal } from '@/styles/styles'
import getCroppedImg from '@/utils/getCroppedImg'
import { updateUser } from '@/features/auth/authSlice'
import { uploadBackground } from '@/apis/user/userAPI'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const EditBackgroundModal = ({ openModal, setOpenModal }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPreview, setCropPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

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
    formData.append('background', blob)

    try {
      dispatch(openBackdrop())

      const response = await uploadBackground(formData)
      dispatch(updateUser(response.user))
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      resetModal()
      setLoading(false)
      dispatch(closeBackdrop())
    }
  }

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          ...styleModal,
          height: '400px',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Chọn ảnh nền
          <HiddenTextField type='file' accept='image/*' onChange={handleImageChange} />
        </Button>
        <Divider />
        {selectedImage && (
          <Box sx={{ position: 'relative', width: 700, height: 200, mt: 2, border: '1px solid' }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1} // Đảm bảo tỷ lệ crop là 1:1
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              cropSize={{ width: 627, height: 200 }} // Chiều rộng và chiều cao tùy chỉnh, đây là hình vuông
              objectFit='cover'
              minZoom={1} // Cài đặt mức zoom tối thiểu
              maxZoom={3} // Cài đặt mức zoom tối đa
            />
          </Box>
        )}
        <Divider />
        {cropPreview && (
          <FlexRow sx={{ mt: 2 }} gap={2}>
            <Button variant='outlined' onClick={handleCloseModal} disabled={!cropPreview}>
              Hủy
            </Button>
            <Button variant='contained' onClick={handleUpload} disabled={loading}>
              Lưu ảnh
            </Button>
          </FlexRow>
        )}
      </Box>
    </Modal>
  )
}

export default EditBackgroundModal
