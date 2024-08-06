import { ReduxProvider } from '@/store/provider';
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
              <div className='main-layout'>
              {children}
              </div>
              <ThemeSwitcher />
            </ReduxProvider>

  )
}

