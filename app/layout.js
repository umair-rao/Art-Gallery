import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Art Gallery App',
  description: 'Aert Gallery App to dispaly images uploaded by users',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
 <body className={inter.className}>
        <AuthContextProvider>
        {children}
        </AuthContextProvider>
        </body>
    </html>
  )
}
