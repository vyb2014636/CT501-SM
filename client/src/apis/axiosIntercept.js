// src/utils/axiosClient.js
import { refreshToken } from '@/features/auth/authThunk'
import env from '@/utils/enviroment'
import axios from 'axios'

const axiosIntercept = axios.create({
  baseURL: env.SOCKET_API_URL // Đảm bảo biến môi trường đã được thiết lập
})

// Hàm này sẽ setup interceptors với store
export const setupAxiosInterceptors = (store) => {
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
      return Promise.reject(error)
    }
  )

  axiosIntercept.interceptors.response.use(
    (response) => {
      return response.data
    },
    async (error) => {
      const originalRequest = error.config
      // if (error.response && error.response.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true
      //   try {
      //     // const response = await store.dispatch(refreshToken())
      //     // const newAccessToken = response.accessToken
      //     console.log(object);
      //     // localStorage.setItem('accessToken', newAccessToken)
      //     // originalRequest.headers.token = `Bearer ${newAccessToken}`
      //     // return axiosIntercept(originalRequest)
      //   } catch (err) {
      //     console.log('Refresh token failed', err)
      //     return err.response.data
      //   }
      // }
      // return error.response.data
      return Promise.reject(error.response.data)
    }
  )
}

export default axiosIntercept
