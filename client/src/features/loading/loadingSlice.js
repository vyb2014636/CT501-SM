// src/store/backdropSlice.js
import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isOpen: false
  },
  reducers: {
    openBackdrop(state) {
      state.isOpen = true
    },
    closeBackdrop(state) {
      state.isOpen = false
    }
  }
})

export const { openBackdrop, closeBackdrop } = loadingSlice.actions

export default loadingSlice.reducer
