import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/utils/axiosIntercept'
import { setToken } from '@/utils/tokenHelper'

export const loginPost = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials
  const response = await axiosIntercept.post('/auth/login', { email, password })
  if (response) {
    const { accessToken, refreshToken } = response
    axiosIntercept.defaults.headers.Authorization = `Bearer ${accessToken}`
    setToken('accessToken', accessToken)
    setToken('refreshToken', refreshToken)
    return response
  } else return rejectWithValue(response)
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.get('/auth/logout')
  if (response) {
    return response
  } else return rejectWithValue(response)
})

// export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
//   const response = await authService.refreshToken()
//   setToken('accessToken', response.data.accessToken)
//   return response.data
// })
