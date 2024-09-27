import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const DialogConfirm = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Xác nhận</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn bỏ qua các thay đổi không?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Không</Button>
        <Button onClick={() => onConfirm(true)} variant='contained'>
          Có
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirm
