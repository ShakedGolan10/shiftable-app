import { AlertModal } from '@/components/alert-modal';
import ThemeSwitcher from '@/components/themeSwitcher';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
              <>
              <AlertModal />
              <div className='main-layout'>
              {children}
              <ThemeSwitcher />
              </div>
              </>  

  )
}

// If want store - uncomment the ReduxProvider
