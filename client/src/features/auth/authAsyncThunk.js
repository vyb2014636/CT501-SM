import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/utils/axiosIntercept'
import { setToken } from '@/utils/tokenHelper'

export const login = createAsyncThunk('auth/postLogin', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials
  const response = await axiosIntercept.post('/auth/login', { email, password })
  if (!response.success) return rejectWithValue(error.response || 'Login failed')

  const { accessToken, refreshToken } = response
  setToken('accessToken', accessToken)
  setToken('refreshToken', refreshToken)

  return response
})

export const logout = createAsyncThunk('auth/getLogout', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.get('/auth/logout')
  if (response) {
    return response
  } else return rejectWithValue(response)
})

export const refreshToken = createAsyncThunk('auth/postRefreshToken', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.post('/auth/refreshToken')
  if (response) {
    setToken('accessToken', response.accessToken)
    setToken('refreshToken', response.refreshToken)
    return response
  } else return rejectWithValue(response)
})
