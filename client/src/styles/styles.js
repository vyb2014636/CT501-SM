export const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 'auto', // Chiều cao tự động để co giãn
  overflowY: 'auto', // Hiển thị thanh cuộn dọc khi vượt quá chiều cao tối đa
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  pt: 3,
  pb: 1,
  px: 4
}

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '8px' // Độ rộng của scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'background.default',
    borderRadius: '8px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'background.paper'
  },
  '&::-webkit-scrollbar': { width: 5 }
}

export const scrollbarStyleMui = {
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar-thumb': { bgcolor: 'background.paper' },
  '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
  '&::-webkit-scrollbar': { width: 5 }
}
export const scrollbarTextFieldStyleMui = {
  '& textarea': {
    // Tùy chỉnh cho textarea bên trong TextField
    overflowY: 'auto',
    '&::-webkit-scrollbar-thumb': { bgcolor: 'background.default' },
    '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
    '&::-webkit-scrollbar': { width: 5 }
  }
}
