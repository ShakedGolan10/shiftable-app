'use client'
import { AlertModal } from '@/components/helpers/alert-modal';
import ThemeSwitcher from '@/components/theme-switcher';
import useResponsiveTheme from '@/hooks/useResponsiveTheme';
import OpacityLoader from '@/components/helpers/opacity-loader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useResponsiveTheme(); // Initialize the design hook

  return (
         
            <>
              <OpacityLoader />
              <AlertModal />
              <section className='main-layout'>
              {children}
              </section>
              <ThemeSwitcher />
            </>

  )
}

