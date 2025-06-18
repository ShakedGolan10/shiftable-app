'use client'
import '@/styles/modules/welcome-page.scss'
import { useAuth } from '@/providers/UserContextProvider'
import { LoginForm } from '@/components/login-form'
import { Navbar, NavbarBrand, useDisclosure } from '@nextui-org/react'
import WelcomeCmp from '@/components/welcome-cmp'
import { Employee, Employer } from '@/types/class.service'
import MainNavBar from '@/components/main-nav-bar'

export default function HomePage() {
  const { login } = useAuth<Employee | Employer>()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const demoEmployeeUserCred = { email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD }
  const demoEmployerUserCred = { email: process.env.NEXT_PUBLIC_DEMO_EMPLOYER_USER_EMAIL, password: process.env.NEXT_PUBLIC_DEMO_EMPLOYER_USER_PASSWORD }

  const onLoginDemoUser = async (isEmployee: boolean) => {
    if (isEmployee) await login(demoEmployeeUserCred)
    else await login(demoEmployerUserCred)
  }

  return (
    <>
      <MainNavBar />
      <main className="flex min-h-screen items-center justify-center">
        <WelcomeCmp onOpen={onOpen} onLoginDemoUser={onLoginDemoUser} />
        <LoginForm isOpen={isOpen} onClose={onClose} />
      </main>
    </>
  )
}
