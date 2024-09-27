import TextField from '@mui/material/TextField'
import FlexRow from '../../Common/Flex/FlexRow'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useState } from 'react'

const EditProfileForm = ({ formData, onChange, initialFormData }) => {
  const [editableFields, setEditableFields] = useState({
    firstname: false,
    lastname: false,
    province: false,
    district: false,
    ward: false
  })

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }))
  }

  const handleCancelClick = (field) => {
    if (formData[field] !== initialFormData[field]) {
      onChange({ target: { name: field, value: initialFormData[field] } }) // Reset to initial value
    }
    setEditableFields((prev) => ({ ...prev, [field]: false }))
  }

  return (
    <div>
      {['firstname', 'lastname', 'province', 'district', 'ward'].map((field) => (
        <FlexRow sx={{ width: '400px' }} key={field}>
          <TextField
            name={field}
            label={
              field === 'firstname'
                ? 'Họ'
                : field === 'lastname'
                ? 'Tên'
                : field === 'province'
                ? 'Thành phố'
                : field === 'district'
                ? 'Quận/Huyện'
                : 'Phường/Xã'
            }
            value={formData[field]}
            onChange={onChange}
            fullWidth
            margin='normal'
            disabled={!editableFields[field]}
          />
          {!editableFields[field] ? (
            <BorderColorOutlinedIcon onClick={() => handleEditClick(field)} style={{ cursor: 'pointer', marginLeft: '8px' }} />
          ) : (
            <CloseOutlinedIcon style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => handleCancelClick(field)} />
          )}
        </FlexRow>
      ))}
    </div>
  )
}

export default EditProfileForm
