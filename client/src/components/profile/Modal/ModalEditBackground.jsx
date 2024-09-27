import React, { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/getCroppedImg'
import VisuallyHiddenInput from '../../Common/Input/VisuallyHiddenInput'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { uploadBackground } from '@/apis/user/userAPI'
import { updateUser } from '@/features/auth/authSlice'
import { styleModal } from '@/styles/styles'
import FlexRow from '../../Common/Flex/FlexRow'
import { Divider } from '@mui/material'
import { CircularProgress } from '@mui/material' // Import spinner

const ModalEditBackground = ({ openModal, setOpenModal }) => {
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
      const response = await uploadBackground(formData)
      dispatch(updateUser(response.user))
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      resetModal()
      setLoading(false)
    }
  }

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ ...styleModal, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Chọn ảnh đại diện
          <VisuallyHiddenInput type='file' accept='image/*' onChange={handleImageChange} />
        </Button>
        <Divider />

        {selectedImage && (
          <Box sx={{ position: 'relative', width: '100%', height: '200px', mt: 2 }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              cropSize={{ width: 627, height: 200 }}
              objectFit='horizontal-cover'
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
              {loading ? <CircularProgress size={24} /> : 'Lưu ảnh'}
            </Button>
          </FlexRow>
        )}
      </Box>
    </Modal>
  )
}

export default ModalEditBackground
