import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/utils/axiosIntercept'
import { login } from './authSlice'
import { useDispatch } from 'react-redux'
import { setToken } from '@/utils/tokenHelper'

export const loginPost = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials
  const response = await axiosIntercept.post('/auth/login', { email, password })
  if (response) {
    const { accessToken, refreshToken } = response
    setToken('accessToken', accessToken)
    setToken('refreshToken', refreshToken)
    axiosIntercept.defaults.headers.Authorization = `Bearer ${accessToken}`
    return response
  } else return rejectWithValue(response)
})

// export const logout = createAsyncThunk('auth/logout', async (id) => {
//   const response = await axios.post('/auth/logout', id)
//   if (response.data) {
//     const { accessToken } = response.data
//     setToken('accessToken', accessToken)
//   }

//   // setToken('accessToken', response.data.accessToken)
//   // setToken('refreshToken', response.data.refreshToken)
//   // return response.data
// })

// export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
//   const response = await authService.refreshToken()
//   setToken('accessToken', response.data.accessToken)
//   return response.data
// })
