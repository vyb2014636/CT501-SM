// src/utils/axiosClient.js
import { refreshToken } from '@/features/auth/authThunk'
import env from '@/utils/enviroment'
import axios from 'axios'
import { refreshTokenAPI } from './auth/authAPI'
import { refreshAccessToken } from '@/features/auth/authSlice'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' // Sử dụng js-cookie để lấy cookie

const axiosIntercept = axios.create({
  baseURL: env.SOCKET_API_URL,
  withCredentials: true
})

// Hàm này sẽ setup interceptors với store
export const setupAxiosInterceptors = (store) => {
  axiosIntercept.interceptors.request.use(
    (config) => {
      // const accessToken = localStorage.getItem('accessToken')
      const state = store.getState()
      const accessToken = state.auth.accessToken
      if (accessToken && accessToken !== '') {
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
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        try {
          const response = await refreshTokenAPI()
          // console.log(response)
          if (response && response.accessToken) {
            await store.dispatch(refreshAccessToken(response))

            originalRequest.headers['token'] = `Bearer ${response.accessToken}`
            return axiosIntercept(originalRequest)
          }
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Phiên đăng nhập đã hết hạn!',
            text: 'Vui lòng đăng nhập lại.',
            confirmButtonText: 'Đến trang đăng nhập'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear()
              window.location.href = '/auth'
            }
          })
        }
      }
      // return error.response.data
      return Promise.reject(error.response.data)
    }
  )
}

export default axiosIntercept
