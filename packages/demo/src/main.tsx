import React from 'react'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </React.StrictMode>
)
