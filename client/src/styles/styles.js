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

export const styleMain = {
  flex: 3,
  mx: { xs: 0, sm: 10, md: 40, lg: 8 },
  pr: 1,
  py: 2
}

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'background.default',
    borderRadius: '8px'
  },

  '&::-webkit-scrollbar': { width: 10 }
}

export const scrollbarStyleMui = {
  overflowY: 'auto',
  overflowX: 'auto',
  scrollbarGutter: 'stable',
  '&::-webkit-scrollbar-thumb': { bgcolor: 'background.paper' },
  '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
  '&::-webkit-scrollbar': { width: 10 }
}
export const scrollbarTextFieldStyleMui = {
  '& textarea': {
    overflowY: 'auto',
    '&::-webkit-scrollbar-thumb': { bgcolor: 'background.default' },
    '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#bfc2cf' },
    '&::-webkit-scrollbar': { width: 5 }
  }
}

export const avatarStyleMui = {
  cursor: 'pointer',
  '&:hover': { opacity: 0.8, transition: 'opacity 0.3s ease' }
}

export const titleAvatarStyleMui = {
  cursor: 'pointer',
  '&:hover': { opacity: 0.8, textDecoration: 'underline', transition: 'opacity 0.3s ease' },
  fontWeight: 'bold'
}
