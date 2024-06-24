'use client'
import '@/styles/modules/welcome-page.scss'
import { useAuth } from '@/providers/UserContextProvider'
import { LoginForm } from '@/components/login-form'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import logo from '@/assets/imgs/shiftable-logo.png'
import WelcomeCmp from '@/components/welcome-cmp'


export default function HomePage() {
  const { user, login, isLoadingLogin } = useAuth()
  const {isOpen, onOpen, onClose} = useDisclosure();

  const router = useRouter()
  const demoUserCred = {email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD}
  const onLoginDemoUser = async () => {
    await login(demoUserCred)
    router.push('/main')
  }
  useEffect(() => {
    if (user) router.push('/main')
  }, [user])

  return (
      <main className="flex min-h-screen items-center justify-center">
        {/* <Image className='fixed' src={logo} alt='aaaaa' width={100} height={100} /> */}
        <nav className="navbar fixed top-0 right-0 left-0 z-50 flex items-center pt-3">
          <div className='w-full mx-auto sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap'>
            <a className="font-semibold m-[10px] text-3xl leading-4 no-underline">Shiftable</a>
            {/* <WelcomePageNavbarMenu /> */}
          </div>
        </nav>
        <>
          <WelcomeCmp onOpen={onOpen} onLoginDemoUser={onLoginDemoUser} isLoadingLogin={isLoadingLogin} />
        </>
        <LoginForm isOpen={isOpen} onClose={onClose} />
      </main>
    )
}
