import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, MenuItem, Button, Typography } from '@mui/material'
import FlexCenter from '@/components/Common/Flex/FlexCenter'
import { toast } from 'react-toastify'
import { updateStatusAPI } from '@/apis/user/userAPI'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'

const EditUserForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null) //dùng để lưu hàm onSubmit
  const user = location.state?.user

  if (!user) return <Typography align='center'>Bạn vui lòng chọn Người dùng mới chuyển hướng đến đây</Typography>

  const [initialStatus, setInitialStatus] = useState(user?.status || '')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      status: user?.status
    }
  })

  const currentStatus = watch('status') // Theo dõi giá trị của 'status' hiện tại

  useEffect(() => {
    if (user) {
      setInitialStatus(user.status) // Lưu trạng thái ban đầu khi user thay đổi
      reset({
        status: user.status
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    try {
      const response = await updateStatusAPI(user, data.status)
      toast.success(response.message, { position: 'bottom-right' })
      navigate('/admin/user')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSave = (data) => {
    setConfirmAction(() => () => onSubmit(data))
    setOpenDialog(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSave)}>
        <Typography variant='h5' gutterBottom textAlign='center' p={2}>
          Chỉnh sửa trạng thái người dùng: <strong>{user.fullname}</strong>
        </Typography>
        <TextField
          select
          label='Trạng thái'
          fullWidth
          error={Boolean(errors.status)}
          helperText={errors.status?.message}
          {...register('status', { required: 'Trạng thái là bắt buộc' })}
          defaultValue={user.status}
          margin='normal'>
          <MenuItem value='Active'>Kích hoạt</MenuItem>
          <MenuItem value='Banned'>Khóa</MenuItem>
        </TextField>
        <FlexCenter>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={currentStatus === initialStatus} // Nút Lưu bị vô hiệu hóa nếu không có thay đổi
          >
            Lưu
          </Button>
          <Button variant='outlined' onClick={() => navigate('/admin/user')} style={{ marginLeft: '10px' }}>
            Hủy
          </Button>
        </FlexCenter>
      </form>

      <ConfirmationDialog
        open={openDialog}
        onConfirm={() => {
          setOpenDialog(false)
          if (confirmAction) {
            confirmAction()
          }
        }}
        onClose={() => setOpenDialog(false)}
        message='Bạn có chắc chắn muốn lưu thay đổi này?'
      />
    </>
  )
}

export default EditUserForm
