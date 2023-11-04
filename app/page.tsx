'use client'

import { useAuth } from '@/components/UserContextProvider'
import { LoginPage } from '@/components/login-page'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoadingAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoadingAuth && user) router.push('/main')
  }, [isLoadingAuth])

  return isLoadingAuth ? (<main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>Loading...</h1></main>) :
    (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {(!user && !isLoadingAuth) && <LoginPage />}
      </main>
    )
}
