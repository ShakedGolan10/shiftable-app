'use client'
import '@/styles/modules/welcome-page.scss'
import { useAuth } from '@/providers/UserContextProvider'
import { LoginForm } from '@/components/login-form'
import { useRouter } from 'next/navigation'
import { Navbar, NavbarBrand, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import logo from '@/assets/imgs/shiftable-logo.png'
import WelcomeCmp from '@/components/welcome-cmp'
import { Employee, Employer } from '@/types/class.service'

export default function HomePage() {
  const { user, login, isLoadingLogin } = useAuth<Employee | Employer>()
  const {isOpen, onOpen, onClose} = useDisclosure();

  const router = useRouter()
  const demoEmployeeUserCred = {email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD}
  const demoEmployerUserCred = {email: process.env.NEXT_PUBLIC_DEMO_EMPLOYER_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_EMPLOYER_USER_PASSWORD}
  
  const onLoginDemoUser = async (isEmployee: boolean) => {
    if (isEmployee) await login(demoEmployeeUserCred)
      else await login(demoEmployerUserCred)
    }
    
  useEffect(() => {
    if (user) router.push('/main')
  }, [user])

  return (
      <main className="flex min-h-screen items-center justify-center">
        {/* <Image className='fixed' src={logo} alt='aaaaa' width={100} height={100} /> */}
        <Navbar style={{justifyContent: 'flex-start'}} className="full bg-transparent absolute">
          <NavbarBrand>
            <p className="font-bold text-inherit">Shiftable</p>
          </NavbarBrand>
        </Navbar>
        <>
          <WelcomeCmp onOpen={onOpen} onLoginDemoUser={onLoginDemoUser} isLoadingLogin={isLoadingLogin} />
        </>
        <LoginForm isOpen={isOpen} onClose={onClose} />
      </main>
    )
}
