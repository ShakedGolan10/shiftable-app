import { UserProvider } from '@/providers/UserContextProvider';
import { ReduxProvider } from '@/store/provider';
import NextUiProvider from '@/providers/NextUIProvider';
import { AlertModal } from '@/components/alert-modal';
import ThemeSwitcher from '@/components/themeSwitcher';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
         
            <ReduxProvider>
              <AlertModal />
              <div className='main-layout '>
              {children}
              <ThemeSwitcher />
              </div>
            </ReduxProvider>

  )
}

// If want store - uncomment the ReduxProvider
