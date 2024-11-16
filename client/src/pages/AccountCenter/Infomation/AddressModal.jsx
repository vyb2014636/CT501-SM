import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, Divider, Typography, Autocomplete, TextField } from '@mui/material'
import { provinces } from '@/utils/constant' // Import provinces
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/features/auth/authSlice'
import { uploadInfo } from '@/apis/user/userAPI'

const AddressModal = ({ open, onClose, currentAddress }) => {
  // State để lưu trữ giá trị tỉnh thành đã chọn và giá trị ban đầu
  const [selectedProvince, setSelectedProvince] = useState(currentAddress || '')
  const [initialProvince, setInitialProvince] = useState(currentAddress || '')
  const dispatch = useDispatch()

  // Cập nhật lại giá trị ban đầu khi modal được mở
  useEffect(() => {
    setSelectedProvince(currentAddress)
    setInitialProvince(currentAddress)
  }, [open, currentAddress])

  // Xử lý thay đổi giá trị của tỉnh thành
  const handleChange = (event, newValue) => {
    setSelectedProvince(newValue ? newValue.value : '')
  }

  // Lưu giá trị và đóng modal
  const handleSave = async () => {
    try {
      const response = await uploadInfo({ province: selectedProvince })
      dispatch(updateUser(response.user))
      toast.success('Cập nhật thông tin thành công!')
      onClose()
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại.')
    }
  }

  const isSaveDisabled = selectedProvince === '' || selectedProvince === initialProvince

  return (
    <ModalWrapper open={open} onClose={onClose} title='Chỉnh sửa địa chỉ' width={400}>
      <FlexColumn sx={{ p: 3 }}>
        <Autocomplete
          options={provinces}
          getOptionLabel={(option) => option.label}
          value={provinces.find((province) => province.value === selectedProvince) || null}
          onChange={handleChange}
          fullWidth
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Tỉnh/Thành phố'
              placeholder='Chọn tỉnh/thành phố'
              fullWidth // Đảm bảo TextField trong Autocomplete chiếm toàn bộ chiều rộng
            />
          )}
          ListboxProps={{ style: { maxHeight: '200px', width: '100%' } }} // Đảm bảo danh sách cuộn đầy đủ
        />

        <Divider sx={{ margin: '16px 0' }} />

        <FlexRow gap={2} ml='auto'>
          <Button onClick={onClose} variant='outlined' color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleSave} variant='contained' color='primary' disabled={isSaveDisabled}>
            Lưu
          </Button>
        </FlexRow>
      </FlexColumn>
    </ModalWrapper>
  )
}

export default AddressModal
