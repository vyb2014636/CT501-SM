import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, MenuItem, Button, Typography } from '@mui/material'
import FlexCenter from '@/components/Common/Flex/FlexCenter'
import { toast } from 'react-toastify'
import { updateStatusAPI } from '@/apis/user/userAPI'

const EditUserForm = ({ user, onCancel, setUsers, setEditMode }) => {
  const [initialStatus, setInitialStatus] = useState(user?.status || '') // Lưu trạng thái ban đầu của user

  if (!user) return <Typography>Không có user</Typography>

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
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === response.updatedUser._id ? response.updatedUser : user)))
      toast.success(response.message, { position: 'bottom-right' })
      setEditMode(false)
      // handleCloseMenu()
      localStorage.removeItem('editMode')
      localStorage.removeItem('selectedUser')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button variant='outlined' onClick={onCancel} style={{ marginLeft: '10px' }}>
          Hủy
        </Button>
      </FlexCenter>
    </form>
  )
}

export default EditUserForm
