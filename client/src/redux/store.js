import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Sử dụng storage mặc định từ redux-persist
import authReducer from '@/features/auth/authSlice'
import { thunk } from 'redux-thunk'

// Cấu hình persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const rootReducer = combineReducers({ auth: authReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  //     }
  //   })
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk) // Thêm thunk vào middleware
})

export let persistor = persistStore(store)
