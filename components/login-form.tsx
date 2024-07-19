'use client'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '../providers/UserContextProvider';
import { useState } from 'react';
import ErrorElement from './error-element';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image} from "@nextui-org/react";


export function LoginForm({ isOpen, onClose }) {

    const [credentials, handleInputChange] = useForm<Credentials>({ email: '', password: '' })
    const [loginError, setLoginError] = useState<string>('')
    const { login, isLoadingLogin } = useAuth();
    const onLogin = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault()
        try {
            setLoginError('')
            await login(credentials)
        } catch (error) {
            setLoginError('Username or password doesnt meet the right requirments, Try again plaese')
            setTimeout(()=> setLoginError(''), 1500)
        }
    }
     return ( 
     <>
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
                                <Button color='success' isDisabled={(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) || credentials.password.length < 4) } 
                                isLoading={isLoadingLogin} 
                                type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm">
                                  Log in
                                </Button>
                            </div>
                        </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} >
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
