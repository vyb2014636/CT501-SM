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
