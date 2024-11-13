// src/utils/validationRules.js

export const nameValidation = {
  required: 'Họ tên là bắt buộc',
  minLength: { value: 3, message: 'Họ tên phải có ít nhất 3 ký tự' },
  maxLength: { value: 50, message: 'Họ tên không được dài quá 50 ký tự' }
}

export const addressValidation = {
  required: 'Địa chỉ là bắt buộc',
  minLength: { value: 6, message: 'Địa chỉ phải có ít nhất 6 ký tự' },
  maxLength: { value: 100, message: 'Địa chỉ không được dài quá 100 ký tự' }
}

export const passwordValidation = {
  required: 'Mật khẩu là bắt buộc',
  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
  validate: (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if (!regex.test(value)) {
      return 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa, 1 ký tự đặc biệt và 1 số'
    }
    return true
  }
}

export const confirmPasswordValidation = (watch, fieldName) => ({
  required: 'Xác nhận mật khẩu là bắt buộc',
  validate: (value) => value === watch(fieldName) || 'Mật khẩu xác nhận không khớp'
})

export const newPasswordValidation = (watch) => ({
  required: 'Mật khẩu mới là bắt buộc',
  minLength: { value: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' },
  validate: (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if (!regex.test(value)) {
      return 'Mật khẩu mới phải có ít nhất 1 chữ cái viết hoa, 1 ký tự đặc biệt và 1 số'
    }
    if (value === watch('currentPassword')) {
      return 'Mật khẩu mới không được trùng với mật khẩu cũ'
    }
    return true
  }
})
