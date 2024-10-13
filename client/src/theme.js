import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
  myApp: {
    heighHeader: '58px',
    heighBackground: '200px',
    widthLeftSide: '400px',
    widthRightSide: '400px'
  },
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          main: '#42a5f5'
        },
        background: {
          default: '#f0f2f5', // Màu nền của Facebook
          paper: '#fff',
          message: '#f0f0f0'
        },
        text: {
          primary: '#333', // Màu chữ chính
          secondary: '#606770', // Màu chữ phụ
          message: 'black',
          own: '#42a5f5'
        },
        neutral: {
          primary: '#f0f2f5'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem` // = 0.25 * 2rem = 0.5rem = 8px
    },
    dark: {
      palette: {
        primary: {
          main: '#fff'
        },
        secondary: {
          main: '#42a5f5'
        },
        background: {
          default: '#18191a', // Màu nền tối
          paper: '#242526',
          message: '#303030',
          own: '#42a5f5',
          list: '#18191a'
        },
        text: {
          primary: '#e4e6eb', // Màu chữ sáng hơn trong chế độ tối
          secondary: '#b0b3b8',
          message: 'white'
        },
        neutral: {
          primary: '#3a3b3c'
        }
      },
      spacing: (factor) => `${0.25 * factor}rem` // = 0.25 * 2rem = 0.5rem = 8px
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.default
        })
      }
    },
    MuiTextField: {
      variants: [
        {
          props: { className: 'inputChat' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.background.message,
            borderRadius: 22,
            outline: 0,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none' // Tắt outline
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: 22
            },
            '& .MuiInputBase-input::placeholder': {
              color: theme.palette.text.message,
              opacity: 0.8
            }
          })
        }
      ]
    }
  }
})

export default theme
