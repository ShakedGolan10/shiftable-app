'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';
import { Falsey } from 'lodash';
import LoadingElement from '@/components/helpers/loading-element';
import { useAsync } from '@/hooks/useAsync';

interface useAuth<T> {
    isLoadingAuth: boolean
    isLoadingLogin: boolean
    user: T 
    login: (credentials: Credentials) => Promise<void> 
    logout: () => void 
    
}

const UserContext = createContext(null);


export const UserProvider = ({ children } : {children: React.ReactNode}) => {

    const [user, setUser] = useState<Employee | Employer>(null)
    const [isLoadingAuth, setLoadingAuth] = useState(null)
    const [isLoadingLogin, setLoadingLogin] = useState(null)
    const router = useRouter()
    const [executeAsyncFunc] = useAsync()
    
    useEffect(() => { // flow for making sure there is a loggedinuser and if not - redirect to the loginPage.
        setLoadingAuth(true)
        const authUser = async () => {
            try {
                let loggedInUser = await userService.getLoggedInUser()
                setUser(loggedInUser)
                } catch (error) {
                    router.push('/')
                } finally {
                    setLoadingAuth(false)
                }
            }
          authUser()
    }, [])
                        
            const login = async (credentials: Credentials) : Promise<void> => {
                try {
                    setLoadingLogin(true)
                    let user = await executeAsyncFunc({
                        asyncOperation: () => userService.login(credentials), 
                        errorMsg: 'Couldnt login, please try again',
                        isLoaderDisabled: true
                    }) 
                    if (!user) throw new Error('error')
                    router.push('/main')
                    user = CreateUserInstance(user)
                    setUser(user)
                } catch (error) {
                    throw new Error(error)
                } finally {
                    setLoadingLogin(false)
                }
            }
                
            const logout = async () : Promise<void> => {
                setUser(null)
                try {
                    await executeAsyncFunc({asyncOperation: () => userService.logout(), errorMsg: 'Couldnt logout, please try again'})
                } catch (error) {
                    router.push('/')
                } finally {
                    router.push('/')
                }
                };
                const value = useMemo(() => ({
                    isLoadingAuth,
                    user,
                    isLoadingLogin,
                    login,
                    logout
                }), [isLoadingAuth, user, isLoadingLogin]);
        
        return (
        <UserContext.Provider value={{ ...value }}>
            {isLoadingAuth && <LoadingElement msg='Loading user...' />}
            {children}
        </UserContext.Provider>
    )};
        
        export function useAuth<T>(): useAuth<T> {
            return useContext(UserContext);
        }