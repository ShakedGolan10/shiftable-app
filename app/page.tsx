'use client'
import styles from '@/styles/modules/welcome-page.module.scss'
import { useAuth } from '@/components/UserContextProvider'
import LoadingElement from '@/components/loading-element'
import { LoginForm } from '@/components/login-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import logo from '@/assets/imgs/shiftable-logo.png'
import NavbarMenu from '@/components/responsive-navbar-menu'
import MainHeader from '@/components/main-header'


export default function Home() {
  const { user, isLoadingAuth } = useAuth()

  const router = useRouter()

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const toggleLoginModal = () => {
    setIsLoginModalOpen(prev => !prev)
  }
  useEffect(() => {
    if (user) router.push('/main')
  }, [isLoadingAuth, user])

  return isLoadingAuth ? (<main className="flex min-h-screen flex-col items-center justify-between p-24"><h1><LoadingElement /></h1></main>) :
    !user && (
      <main className="flex min-h-screen flex-row items-center justify-center">
        {/* Todo: Make a beautiful homepage using pavo template */}
        {/* <Image className='fixed' src={logo} alt='aaaaa' width={100} height={100} /> */}
        <nav className="navbar fixed top-0 right-0 left-0 z-50 flex items-center pt-3">
          <div className={`${styles['container']} sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap`}>
            <a className="text-gray-800 font-semibold text-3xl leading-4 no-underline">Pavo</a>
            <NavbarMenu />
          </div>
        </nav>
        <>
          <MainHeader toggleLoginModal={toggleLoginModal} />
        </>
        {isLoginModalOpen && <LoginForm toggleLoginModal={toggleLoginModal} />}
      </main>
    )
}
