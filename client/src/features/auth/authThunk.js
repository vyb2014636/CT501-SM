import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'
import { setToken } from '@/utils/tokenHelper'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials
  return axiosIntercept
    .post('/auth/login', { email, password })
    .then((response) => {
      return response
    })
    .catch((error) => rejectWithValue(error))
})

export const loginWith2FA = createAsyncThunk('auth/login2FA', async (credentials, { rejectWithValue }) => {
  const { email, token } = credentials
  return axiosIntercept
    .post('/auth/verify2FA', { email, token })
    .then((response) => {
      return response
    })
    .catch((error) => rejectWithValue(error))
})
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  axiosIntercept
    .get('/auth/logout')
    .then((response) => {
      return response
    })
    .catch((error) => rejectWithValue(error))
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('/auth/refreshToken')
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})
