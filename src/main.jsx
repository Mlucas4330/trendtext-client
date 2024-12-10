import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { grommet, Grommet } from 'grommet'
import { deepMerge } from 'grommet/utils/index.js'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const theme = deepMerge(grommet, {
  global: {
    colors: {
      background: '#111827'
    },
    focus: {
      outline: 'none'
    }
  },
  tip: {
    content: {
      background: 'background-contrast',
      elevation: 'none',
      pad: 'small',
      round: 'small'
    }
  },
  formField: {
    label: {
      requiredIndicator: true
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Grommet theme={theme} full="min">
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="bottom-center" />
        </AuthProvider>
      </BrowserRouter>
    </Grommet>
  </StrictMode>
)
