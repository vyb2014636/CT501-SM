import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Typography, TextField, Button, Divider } from '@mui/material'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { firstnameValidation, lastnameValidation } from '@/utils/validationRules'
import { uploadInfo } from '@/apis/user/userAPI'
import { updateUser } from '@/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const NameModal = ({ open, onClose, currentName }) => {
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: currentName.firstname || '',
      lastname: currentName.lastname || ''
    }
  })

  const [isChanged, setIsChanged] = useState(false)

  const watchFields = watch(['firstname', 'lastname'])

  useEffect(() => {
    const hasChanges = watchFields[0] !== currentName.firstname || watchFields[1] !== currentName.lastname
    setIsChanged(hasChanges)
  }, [watchFields, currentName])

  const onSubmit = async (data) => {
    try {
      const response = await uploadInfo(data)
      dispatch(updateUser(response.user))
      toast.success(response?.message)
      onClose()
    } catch (error) {
      toast.error(error?.message)
    }
  }

  const handleCancel = () => {
    // Reset lại form về tên cũ
    reset({
      firstname: currentName.firstname || '',
      lastname: currentName.lastname || ''
    })
    onClose()
  }

  return (
    <ModalWrapper open={open} onClose={handleCancel} title='Tên' width={600}>
      <Box p={4} component='form' onSubmit={handleSubmit(onSubmit)}>
        <Box bgcolor='background.default' borderRadius={4}>
          <Controller
            name='firstname'
            control={control}
            rules={firstnameValidation}
            render={({ field }) => (
              <TextField
                {...field}
                label='Tên'
                fullWidth
                margin='normal'
                variant='standard'
                error={!!errors.firstname}
                sx={{ m: 1, px: 4 }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    py: 1
                  }
                }}
                InputLabelProps={{
                  sx: {
                    pl: 4,
                    fontSize: 18
                  }
                }}
              />
            )}
          />
          <Divider />
          <Controller
            name='lastname'
            control={control}
            rules={lastnameValidation}
            render={({ field }) => (
              <TextField
                {...field}
                label='Họ'
                fullWidth
                margin='normal'
                variant='standard'
                error={!!errors.lastname}
                sx={{ m: 1, px: 4 }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    py: 1
                  }
                }}
                InputLabelProps={{
                  sx: {
                    pl: 4,
                    fontSize: 18
                  }
                }}
              />
            )}
          />
        </Box>
        <Typography variant='body2' color='textSecondary' mt={2} mb={2}>
          Nếu đổi tên, bạn không thể đổi lại trong 60 ngày.
        </Typography>
        <Box display='flex' justifyContent='space-between' mt={3}>
          <Button onClick={handleCancel} variant='outlined' color='primary'>
            Hủy
          </Button>
          <Button type='submit' variant='contained' color='primary' disabled={!isValid || !isChanged}>
            Thay đổi
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  )
}

export default NameModal
