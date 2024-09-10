// src/utils/axiosClient.js
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const axiosIntercept = axios.create({
  baseURL: 'http://localhost:8017/v1' // Đảm bảo biến môi trường đã được thiết lập
  // headers: {
  //   'Content-Type': 'application/json'
  // }
})

axiosIntercept.interceptors.request.use(
  (config) => {
    // Do something before request is sent, e.g., adding authorization tokens
    const accessToken = localStorage.getItem('accessToken') // Hoặc từ nguồn lưu trữ khác
    if (accessToken) {
      config.headers.token = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error)
  }
)

axiosIntercept.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data
  }
)

export default axiosIntercept
