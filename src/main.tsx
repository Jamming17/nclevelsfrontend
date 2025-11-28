import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import { SettingsContextProvider } from "./context/SettingsContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
            <SettingsContextProvider>
                <App />
            </SettingsContextProvider>
      </BrowserRouter>
  </StrictMode>
)