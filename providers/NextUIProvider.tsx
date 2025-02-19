'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export default function ThemeProvider({ children }) {

  return (
    <NextUIProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark-desktop"
        themes={[
          'light',
          'dark',
          'light-desktop',
          'light-tablet',
          'light-mobile',
          'dark-desktop',
          'dark-tablet',
          'dark-mobile',
        ]}
      >
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}