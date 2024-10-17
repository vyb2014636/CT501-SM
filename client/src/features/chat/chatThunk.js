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

export const accessChat = createAsyncThunk('chat/access', async ({ userID, chatName, isGroupChat, users }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('/chat/', { users: users, chatName, isGroupChat, userID })

    return response // Trả về dữ liệu từ response
  } catch (error) {
    return rejectWithValue(error.response) // Trả về lỗi
  }
})

export const createGroupChat = createAsyncThunk('chat/group', async ({ users, chatName }, { rejectWithValue }) => {
  try {
    const response = await axiosIntercept.post('/post/group', { users, chatName })

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
