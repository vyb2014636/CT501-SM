import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { Provider } from 'react-redux'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { persistor, store } from '@/redux/store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import theme from '@/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </PersistGate>
  </Provider>
)
