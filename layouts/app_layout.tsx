// import { ReduxProvider } from '@/store/provider'
// import { TanstackProvider } from '@/providers/TanstackProvider';

import { UserProvider } from '@/providers/UserContextProvider';
import { ReduxProvider } from '@/store/provider';
import { AlertModal } from '@/components/alert-modal';
import NextUiProvider from '@/providers/NextUIProvider';
import ThemeSwitcher from '@/components/themeSwitcher';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <NextUiProvider>
        {/* <TanstackProvider> */}
          <UserProvider>
            <ReduxProvider>
              <AlertModal />
              <div className='main-layout '>
              {children}
              <ThemeSwitcher />
              </div>
            </ReduxProvider>
          </UserProvider>
        {/* </TanstackProvider> */}
        </NextUiProvider>
     

  )
}

// If want store - uncomment the ReduxProvider
