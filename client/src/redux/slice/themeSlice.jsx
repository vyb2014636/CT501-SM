// src/store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    changeTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer
