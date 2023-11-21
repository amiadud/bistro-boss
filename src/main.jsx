import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

<AuthProvider>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routes}>
        </RouterProvider>
    </QueryClientProvider>
</AuthProvider>
)
