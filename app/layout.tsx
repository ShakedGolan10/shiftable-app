// import { ReduxProvider } from '@/store/provider'
import { TanstackProvider } from '@/components/TanstackProvider';
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { UserProvider } from '@/components/UserContextProvider';
import { ReduxProvider } from '@/store/provider';
import { AlertModal } from '@/components/alert-modal';
import HomePage from './page';
import LoadingElement from '@/components/loading-element';
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

    <html lang="en" className='h-full'>
      <body className={inter.className + ` h-full`}>
        <TanstackProvider>
          <UserProvider>
            <ReduxProvider>
              <AlertModal />
              <HomePage>
                <LoadingElement />
              </HomePage>
              {children}
            </ReduxProvider>
          </UserProvider>
        </TanstackProvider>
      </body>
    </html>

  )
}

// If want store - uncomment the ReduxProvider
