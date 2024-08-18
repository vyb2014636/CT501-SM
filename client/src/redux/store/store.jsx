import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '@/redux/slice/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})
