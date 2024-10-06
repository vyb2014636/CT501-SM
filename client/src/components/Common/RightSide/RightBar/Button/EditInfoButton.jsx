import { useState } from 'react'
import { toast } from 'react-toastify'
import { uploadInfo } from '@/apis/user/userAPI'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import EditProfileForm from '@/components/user/Card/Button/Form/EditProfileForm'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

const EditInfoButton = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    province: user.address?.province || '',
    district: user.address?.district || '',
    ward: user.address?.ward || ''
  })
  const [initialFormData, setInitialFormData] = useState(formData)

  const handleEditClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      const confirmClose = window.confirm('Bạn có muốn bỏ thay đổi không?')
      if (confirmClose) {
        setFormData(initialFormData)
      } else {
        return
      }
    }
    setOpen(false)
  }

  const handleSave = async () => {
    const { firstname, lastname, province, district, ward } = formData
    const data = {
      firstname,
      lastname,
      address: {
        province,
        district,
        ward
      }
    }
    try {
      await uploadInfo(data)
      toast.success('Cập nhật thông tin thành công!')
      setInitialFormData(formData) // Cập nhật lại initialFormData sau khi lưu thành công
      setOpen(false) // Đóng form sau khi lưu thành công
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData)

  return (
    <>
      <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', width: 210, mx: 'auto', my: 2 }} onClick={handleEditClick}>
        <Typography variant='body1' fontWeight='bold'>
          Chỉnh sửa thông tin
        </Typography>
        <BorderColorOutlinedIcon />
      </Button>
      <Dialog open={open}>
        <DialogTitle>Chỉnh sửa thông tin của bạn</DialogTitle>
        <DialogContent>
          <EditProfileForm formData={formData} setFormData={setFormData} onChange={handleChange} initialFormData={initialFormData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant='contained' disabled={!isFormChanged}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditInfoButton
