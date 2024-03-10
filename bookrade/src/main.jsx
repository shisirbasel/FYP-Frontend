import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    <ToastContainer style={{fontSize: '13px'}}/>
    </PersistGate>
  </Provider>
  </React.StrictMode>,
)





