import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router.jsx' // new syntax for React Router. Resembles vue router.
import { RouterProvider } from 'react-router-dom' // new syntax for React Router. Resembles vue router.
import { ContextProvider } from './contexts/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} /> {/* new syntax for React Router. Resembles vue router. Routes are inside router.jsx above */}
    </ContextProvider>
  </React.StrictMode>,
)
