import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  myApp: {
    heighHeader: '58px',
    heighBackground: '200px'
  },
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          main: '#42a5f5'
        },
        background: {
          default: '#f0f2f5', // Màu nền của Facebook
          paper: '#fff'
        },
        text: {
          primary: '#333', // Màu chữ chính
          secondary: '#606770' // Màu chữ phụ
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
          paper: '#242526'
        },
        text: {
          primary: '#e4e6eb', // Màu chữ sáng hơn trong chế độ tối
          secondary: '#b0b3b8'
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main
              }
            }
          }
        }
      }
    }
  }
})

export default theme
