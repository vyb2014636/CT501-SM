import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import FlexRow from '@components/Common/Flex/FlexRow'
import Autocomplete from '@mui/material/Autocomplete'
import { provinces } from '@/utils/constant'
import { Box } from '@mui/material'
import FlexColumn from '@/components/Common/Flex/FlexColumn'

const EditProfileForm = ({ formData, onChange, initialFormData }) => {
  const [editableFields, setEditableFields] = useState({
    firstname: false,
    lastname: false,
    province: false
  })

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }))
  }

  const handleCancelClick = (field) => {
    if (formData[field] !== initialFormData[field]) {
      onChange({ target: { name: field, value: initialFormData[field] } })
    }
    setEditableFields((prev) => ({ ...prev, [field]: false }))
  }

  return (
    <FlexColumn gap={2}>
      {/* Firstname */}
      <FlexRow sx={{ width: '400px' }}>
        <TextField
          name='firstname'
          label='Họ'
          value={formData.firstname}
          onChange={onChange}
          fullWidth
          margin='normal'
          disabled={!editableFields.firstname}
        />
        {!editableFields.firstname ? (
          <BorderColorOutlinedIcon onClick={() => handleEditClick('firstname')} style={{ cursor: 'pointer', marginLeft: '8px' }} />
        ) : (
          <CloseOutlinedIcon style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => handleCancelClick('firstname')} />
        )}
      </FlexRow>

      {/* Lastname */}
      <FlexRow sx={{ width: '400px' }}>
        <TextField
          name='lastname'
          label='Tên'
          value={formData.lastname}
          onChange={onChange}
          fullWidth
          margin='normal'
          disabled={!editableFields.lastname}
        />
        {!editableFields.lastname ? (
          <BorderColorOutlinedIcon onClick={() => handleEditClick('lastname')} style={{ cursor: 'pointer', marginLeft: '8px' }} />
        ) : (
          <CloseOutlinedIcon style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => handleCancelClick('lastname')} />
        )}
      </FlexRow>

      {/* Province */}
      <FlexRow sx={{ width: '400px' }}>
        <Autocomplete
          options={provinces}
          getOptionLabel={(option) => option.label}
          value={provinces.find((province) => province.value === formData.province) || null}
          onChange={(event, newValue) => {
            if (newValue) {
              onChange({ target: { name: 'province', value: newValue.value } })
            } else {
              onChange({ target: { name: 'province', value: formData.province } })
            }
          }}
          fullWidth
          disabled={!editableFields.province}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label='Tỉnh/Thành phố' placeholder='Chọn tỉnh/thành phố' />}
          ListboxProps={{ style: { maxHeight: '200px' } }}
        />
        {!editableFields.province ? (
          <BorderColorOutlinedIcon onClick={() => handleEditClick('province')} style={{ cursor: 'pointer', marginLeft: '8px' }} />
        ) : (
          <CloseOutlinedIcon style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => handleCancelClick('province')} />
        )}
      </FlexRow>
    </FlexColumn>
  )
}

export default EditProfileForm
