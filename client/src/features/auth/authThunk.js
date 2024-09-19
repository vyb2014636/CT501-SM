import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'
import { setToken } from '@/utils/tokenHelper'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials
  return axiosIntercept
    .post('/auth/login', { email, password })
    .then((response) => {
      const { accessToken, refreshToken } = response
      setToken('accessToken', accessToken)
      setToken('refreshToken', refreshToken)
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
  const response = await axiosIntercept
    .post('/auth/refreshToken')
    .then((response) => {
      setToken('accessToken', response.accessToken)
      setToken('refreshToken', response.refreshToken)
      return response
    })
    .catch((error) => rejectWithValue(error))

  if (response) {
  } else return rejectWithValue(response)
})
