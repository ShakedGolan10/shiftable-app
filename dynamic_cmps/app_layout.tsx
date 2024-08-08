'use client'
import { ReduxProvider } from '@/store/provider';
import { AlertModal } from '@/components/alert-modal';
import ThemeSwitcher from '@/components/theme-switcher';
import useResponsiveTheme from '@/hooks/useResponsiveTheme';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useResponsiveTheme(); // Initialize the hook

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

