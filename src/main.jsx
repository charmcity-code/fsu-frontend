import { StrictMode } from 'react'

import { AuthProvider } from './auth/AuthContext.jsx'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom"
import { ApiProvider } from './api/ApiContext.jsx'

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </AuthProvider>
);
