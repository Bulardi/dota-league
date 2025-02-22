'use client'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../app/globals.css'
import Navbar from './components/navbar'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { AuthProvider } from '@/lib/context/authContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}