'use client'

import { useForm } from '@/hooks/useForm'
import { useAuth } from '../providers/UserContextProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorElement from './error-element';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image} from "@nextui-org/react";


export function LoginForm({ isOpen, onClose }) {

    const [credentials, handleInputChange] = useForm<Credentials>({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string>('')
    const { login } = useAuth();
    const router = useRouter()
    const onLogin = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault()
        try {
            setLoginError('')
            await login(credentials)
            router.push('/main')
        } catch (error) {
            setLoginError('Username or password doesnt meet the right requirments, Try again plaese')
            setTimeout(()=> setLoginError(''), 1500)
        }
    }
    // return (
    //     <section className='login-modal'>

    //         <div onClick={toggleLoginModal} className={`back-screen fixed opacity-100 z-5 inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}></div>

    //         <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-fit min-w-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //             <div className={` bg-white dark:bg-bgc-dark relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all my-8 w-full max-w-lg opacity-100 translate-y-0 sm:scale-100 ease-out duration-300`}>
    //                 <div className="mx-auto w-full">
    //                     {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
    //                     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">כניסה למערכת</h2>
    //                 </div>

    //                 <div className="mt-10 mx-auto w-full px-4">
    //                     <form onSubmit={onLogin} className="space-y-6" action="#" method="POST">
    //                         <div>
    //                             <label className="block text-sm font-medium leading-6">Email address</label>
    //                             <div className="mt-2">
    //                                 <input value={credentials.email} onChange={handleInputChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <div className="flex items-center justify-between">
    //                                 <label className="block text-sm font-medium leading-6">Password</label>
    //                                 <div className="text-sm">
    //                                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
    //                                 </div>
    //                             </div>
    //                             <div className="mt-2">
    //                                 <input value={credentials.password} onChange={handleInputChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    //                             </div>
    //                         </div>

    //                             {loginError && <ErrorElement message={loginError} />}
    //                         <div>
    //                             <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
    //                         </div>
    //                     </form>
    //                 </div>
    //                 <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    //                     <button onClick={() => toggleLoginModal()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto">Close</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>

    // )
     return ( <>
     <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">Login to your account</ModalHeader>
              <ModalBody>
                <form onSubmit={onLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium leading-6">Email address</label>
                                <div className="mt-2">
                                    <input value={credentials.email} onChange={handleInputChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input value={credentials.password} onChange={handleInputChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                                {loginError && <ErrorElement message={loginError} />}
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                            </div>
                        </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
)
}
