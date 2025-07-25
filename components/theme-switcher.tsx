'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const handleThemeSwitch = () => {
    if (resolvedTheme.includes('dark')) {
      setTheme(resolvedTheme.replace('dark', 'light'))
    } else {
      setTheme(resolvedTheme.replace('light', 'dark'))
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='z-50 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 fixed top-2/4 left-0 m-4 mobile:top-0 mobile:left-2/4'
      onClick={handleThemeSwitch}
    >
      {resolvedTheme.includes('dark') ? (
        <SunIcon className='h-5 w-5 text-orange-300' />
      ) : (
        <MoonIcon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  )
}
