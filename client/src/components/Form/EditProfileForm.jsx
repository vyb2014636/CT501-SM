import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import vietnamData from '@/data/vietnamData.json' // Nhập tệp JSON

const EditProfileForm = ({ open, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    hometown: '',
    district: '',
    ward: ''
  })

  const [initialData, setInitialData] = useState({}) // Lưu trữ dữ liệu ban đầu
  const [provinces, setProvinces] = useState(vietnamData.provinces)
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  useEffect(() => {
    if (open) {
      const initialFormData = {
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        hometown: user.hometown || '',
        district: user.district || '',
        ward: user.ward || ''
      }

      setFormData(initialFormData)
      setInitialData(initialFormData) // Lưu trữ dữ liệu ban đầu
      setSelectedProvince(user.hometown || '')
      setSelectedDistrict(user.district || '')

      // Lấy danh sách quận huyện dựa trên tỉnh thành đã chọn
      setDistricts(vietnamData.districts[user.hometown] || [])
      setWards(vietnamData.wards[user.district] || [])
    }
  }, [open, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProvinceChange = (e) => {
    const provinceValue = e.target.value
    setSelectedProvince(provinceValue)
    setSelectedDistrict('')
    setFormData({ ...formData, hometown: provinceValue, district: '', ward: '' })

    setDistricts(vietnamData.districts[provinceValue] || [])
  }

  const handleDistrictChange = (e) => {
    const districtValue = e.target.value
    setSelectedDistrict(districtValue)
    setFormData({ ...formData, district: districtValue, ward: '' }) // Reset ward when district changes

    setWards(vietnamData.wards[districtValue] || [])
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleClose = () => {
    setFormData(initialData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
      <DialogContent>
        <TextField margin='dense' label='Họ' name='lastname' fullWidth value={formData.lastname} onChange={handleChange} />
        <TextField margin='dense' label='Tên' name='firstname' fullWidth value={formData.firstname} onChange={handleChange} />

        <FormControl fullWidth margin='dense'>
          <InputLabel>Quê quán</InputLabel>
          <Select name='hometown' value={formData.hometown} onChange={handleProvinceChange} label='Quê quán'>
            {provinces.map((province) => (
              <MenuItem key={province.code} value={province.code}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense'>
          <InputLabel>Quận/Huyện</InputLabel>
          <Select name='district' value={formData.district} onChange={handleDistrictChange} disabled={!selectedProvince} label='Quận/Huyện'>
            {districts.map((district) => (
              <MenuItem key={district.code} value={district.code}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='dense'>
          <InputLabel>Phường/Xã</InputLabel>
          <Select name='ward' value={formData.ward} onChange={handleChange} disabled={!selectedDistrict} label='Phường/Xã'>
            {wards.map((ward) => (
              <MenuItem key={ward.code} value={ward.code}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProfileForm
