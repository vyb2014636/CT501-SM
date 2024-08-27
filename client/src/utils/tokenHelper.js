// src/utils/tokenHelper.js

// Lưu token vào localStorage
export const setToken = (key, token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, token)
  }
}

// Lấy token từ localStorage
export const getToken = (key) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

// Xóa token khỏi localStorage
export const removeToken = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
