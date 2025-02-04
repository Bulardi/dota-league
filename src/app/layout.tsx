'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../app/globals.css'
import Navbar from './components/navbar'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
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