import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosIntercept from '@/apis/axiosIntercept'

export const fetchChats = createAsyncThunk('chat/listChat', async (_, { rejectWithValue }) => {
  const response = await axiosIntercept.get(`/chat/`)
  try {
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})

export const accessChat = createAsyncThunk('chat/access', async ({ chatID, userID }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('/chat/', { chatID, userID })

    return response // Trả về dữ liệu từ response
  } catch (error) {
    return rejectWithValue(error.response) // Trả về lỗi
  }
})

export const createGroupChat = createAsyncThunk('chat/group', async ({ users, chatName, avatar }, { rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('users', JSON.stringify(users))
    formData.append('chatName', chatName)

    if (avatar) {
      const response = await fetch(avatar)
      const blob = await response.blob()
      formData.append('avatarGroup', blob, avatar.name)
    }

    const response = await axiosIntercept.post('/chat/group', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})

export const fetchMessages = createAsyncThunk('message/', async (chatID, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.get(`/chat/${chatID}/messages`)
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})

export const sendNewMessage = createAsyncThunk('message/sendMes', async ({ chatID, content }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post(`/chat/sendMessage`, { chatID, content })
    return response
  } catch (error) {
    rejectWithValue(error)
  }
})
