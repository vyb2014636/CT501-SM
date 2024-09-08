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
    backgroundColor: '#c1c1c1', // Màu sắc của scrollbar thumb
    borderRadius: '8px' // Bo tròn scrollbar
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#9e9e9e' // Màu khi hover vào scrollbar thumb
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1' // Màu nền track của scrollbar
  }
}
