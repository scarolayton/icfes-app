import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { MyContextProvider } from '@/context/themeContext'
export const metadata = {
  title: 'Icfes App',
  description: 'App to study for the Icfes test',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MyContextProvider>
          <body className={`${inter.className} from-indigo-600 to-indigo-300`}>{children}</body>
      </MyContextProvider>
    </html>
  )
}
