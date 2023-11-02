'use client'

import { useAuth } from '@/components/UserContextProvider'
import { LoginPage } from '@/components/login-page'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoadingAuth } = useAuth()

  return isLoadingAuth ? <h1>Loading...</h1> :
    (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {(!user) ? (<LoginPage />) : (<div>
          <h1>Sucess</h1>
        </div>)}
      </main>
    )
}
