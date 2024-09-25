import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import EditProfileForm from '../Form/EditProfileForm'
import { useEffect, useState } from 'react'
import { uploadInfo } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

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
        setFormData(initialFormData) // Reset lại dữ liệu
      } else {
        return // Không đóng dialog nếu người dùng không muốn bỏ thay đổi
      }
    }
    setOpen(false)
  }

  const handleSave = async () => {
    const { firstname, lastname, province, district, ward } = formData
    if (!province || !district || !ward) {
      toast.error('Không được để rỗng')
    } else {
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
        handleClose()
      } catch (error) {
        toast.error('Cập nhật thông tin thất bại.')
      }
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
      <Dialog open={open} onClose={handleClose}>
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
