// import { ReduxProvider } from '@/store/provider'
// import { TanstackProvider } from '@/providers/TanstackProvider';
import '@/styles/globals.scss'
import '@/styles/layout.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { AppLayout } from '@/services/exports'
import { UserProvider } from '@/providers/UserContextProvider'
import NextUiProvider from '@/providers/NextUIProvider'

export const metadata: Metadata = {
  title: 'Shiftable App',
  description: 'Generated by Shaked Golan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (


    <html lang="en" className='h-full' suppressHydrationWarning>
      <body className={inter.className + ` min-h-screen max-h-max bg-bgc-light dark:bg-bgc-dark`}>
      <UserProvider>
        <NextUiProvider>
          <AppLayout children={children} />
        </NextUiProvider>
      </UserProvider>
      </body>
    </html>

  )
}

// If want store - uncomment the ReduxProvider
