export const validateField = (name, value, credentials) => {
  let error = ''
  switch (name) {
    case 'firstname':
    case 'lastname':
      if (!value.trim()) {
        error = 'Không được để trống'
      } else if (/\d/.test(value)) {
        // Kiểm tra nếu có số trong tên
        error = 'Họ tên không được chứa số'
      }
      break
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = 'Vui lòng nhập email'
      }
      break
    case 'password':
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
        error = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số, và ký tự đặc biệt.'
      }
      break
    case 'confirmPassword':
      if (value !== credentials.password) {
        // Kiểm tra nếu confirmPassword không khớp với password
        error = 'Mật khẩu không khớp'
      }
      break
    default:
      break
  }
  return error
}
