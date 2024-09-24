import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

const EditInfoButton = ({ onClick }) => {
  return (
    <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', width: 210, mx: 'auto', my: 2 }} onClick={onClick}>
      <Typography variant='body1' fontWeight='bold'>
        Chỉnh sửa thông tin
      </Typography>
      <BorderColorOutlinedIcon />
    </Button>
  )
}

export default EditInfoButton
