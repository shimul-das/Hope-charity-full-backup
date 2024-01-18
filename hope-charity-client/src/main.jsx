import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/App.Routes.jsx';
import AuthProvider from './Providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
  <AuthProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider>
    </HelmetProvider>
  </AuthProvider>
  </Elements>
);
