import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Sử dụng storage mặc định từ redux-persist
import authReducer from '@/features/auth/authSlice'
import postReducer from '@/features/post/postSlice'
import commentReducer from '@/features/comment/commentSlice'
import loadingReducer from '@/features/loading/loadingSlice'
import requestReducer from '@/features/request/requestSlice'
import friendReducer from '@/features/friend/friendSlice'
import notificationReducer from '@/features/notification/notificationSlice'
import { setupAxiosInterceptors } from '@/apis/axiosIntercept'

// Cấu hình persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['post', 'comment', 'loading', 'request']
}

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  loading: loadingReducer,
  notification: notificationReducer,
  request: requestReducer,
  friend: friendReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

setupAxiosInterceptors(store)

export let persistor = persistStore(store)
