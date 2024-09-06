// // import axiosIntercept from '@/utils/axiosIntercept'
// // import { setToken } from '@/utils/tokenHelper'

// // export const login = async (credentials) => {
// //   const { email, password } = credentials
// //   const response = await axiosIntercept.post('/auth/login', { email, password })
// //   if (response.success) {
// //     const { accessToken, refreshToken } = response
// //     setToken('accessToken', accessToken)
// //     setToken('refreshToken', refreshToken)
// //   }
// //   return response
// // }

// // export const logout = async () => {
// //   const response = await axiosIntercept.get('/auth/logout')
// //   return response
// // }

// // export const refreshToken = async () => {
// //   const response = await axiosIntercept.post('/auth/refreshToken')
// //   if (response) {
// //     setToken('accessToken', response.accessToken)
// //     setToken('refreshToken', response.refreshToken)
// //   }
// //   return response
// // }

// import axiosIntercept from '@/utils/axiosIntercept'
// import { setToken } from '@/utils/tokenHelper'
// import { loginStart, loginSuccess, loginFailure, logoutSuccess, refreshTokenSuccess } from './authSlice'
// import { parseHtmlError } from '@/utils/helpers'

// export const login = (credentials) => async (dispatch) => {
//   dispatch(loginStart())

//   const { email, password } = credentials
//   const response = await axiosIntercept.post('/auth/login', { email, password })
//   if (response?.success) {
//     const { accessToken, refreshToken, user } = response
//     setToken('accessToken', accessToken)
//     setToken('refreshToken', refreshToken)
//     dispatch(loginSuccess({ accessToken, refreshToken, user: user }))
//     return response
//   } else if (response?.data && typeof response.data === 'string') {
//     const errorMessage = parseHtmlError(response.data)
//     dispatch(loginFailure(errorMessage))
//     return { success: false, message: errorMessage }
//   }
// }

// export const logout = () => async (dispatch) => {
//   await axiosIntercept.get('/auth/logout')
//   dispatch(logoutSuccess())
// }

// export const refreshToken = () => async (dispatch) => {
//   try {
//     const response = await axiosIntercept.post('/auth/refreshToken')
//     if (response) {
//       setToken('accessToken', response.accessToken)
//       setToken('refreshToken', response.refreshToken)
//       dispatch(refreshTokenSuccess({ accessToken: response.accessToken, refreshToken: response.refreshToken }))
//     }
//   } catch (error) {
//     console.error('Failed to refresh token:', error.message)
//   }
// }
