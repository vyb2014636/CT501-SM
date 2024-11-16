import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Sử dụng storage mặc định từ redux-persist
import authReducer from '@/features/auth/authSlice'
import postReducer from '@/features/post/postSlice'
import commentReducer from '@/features/comment/commentSlice'
import loadingReducer from '@/features/loading/loadingSlice'
import requestReducer from '@/features/request/requestSlice'
import chatReducer from '@/features/chat/chatSlice'
import messageReducer from '@/features/chat/messageSlice'
import friendshipReducer from '@/features/request/friendshipSlice'
import onlineReducer from '@/features/online/onlineSlice'
import notificationReducer from '@/features/notification/notificationSlice'
import reloadReducer from '@/features/loading/reloadSlice'
import { setupAxiosInterceptors } from '@/apis/axiosIntercept'

// Cấu hình persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['post', 'comment', 'loading', 'frienship', 'message']
}

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  loading: loadingReducer,
  notification: notificationReducer,
  request: requestReducer,
  friendship: friendshipReducer,
  chat: chatReducer,
  message: messageReducer,
  online: onlineReducer,
  reload: reloadReducer
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
