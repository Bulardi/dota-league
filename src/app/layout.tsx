'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../app/globals.css'
import Navbar from './components/navbar'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  )
}