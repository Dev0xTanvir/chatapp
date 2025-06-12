import { StrictMode } from 'react'
import database from '../Database/FIrebase.config.js'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { store } from './fetures/store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
