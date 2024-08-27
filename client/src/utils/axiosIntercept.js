// src/utils/axiosClient.js
import axios from 'axios'
// import { store } from '@/redux/store' // Đảm bảo đường dẫn chính xác

const axiosIntercept = axios.create({
  baseURL: 'http://localhost:8017/v1' // Đảm bảo biến môi trường đã được thiết lập
  // headers: {
  //   'Content-Type': 'application/json'
  // }
})
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
axiosIntercept.interceptors.request.use(
  (config) => {
    // Do something before request is sent, e.g., adding authorization tokens
    return config
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosIntercept.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)
// axiosIntercept.interceptors.request.use(
//   (config) => {
//     const state = store.getState()
//     const accessToken = state.auth.accessToken
//     console.log(accessToken)
//     console.log('Access Token:', accessToken) // Debug log

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     } else {
//       delete config.headers.Authorization // Xóa header nếu không có token
//     }
//     return config
//   },
//   (error) => {
//     console.error('Request Error:', error) // Debug log
//     return Promise.reject(error)
//   }
// )

// Uncomment nếu bạn muốn sử dụng refresh token
// axiosIntercept.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const response = await store.dispatch(refreshToken());
//       if (response?.payload?.accessToken) {
//         originalRequest.headers.Authorization = `Bearer ${response.payload.accessToken}`;
//         return axiosIntercept(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosIntercept
