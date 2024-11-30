'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';
import LoadingElement from '@/components/helpers/loading-element';
import { useAsync } from '@/hooks/useAsync';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';

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
    const router = useRouter();
    const path = usePathname() 
    const [executeAsyncFunc] = useAsync()
    
            
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
        try {
            await executeAsyncFunc({asyncOperation: () => userService.logout(), errorMsg: 'Couldnt logout, please try again'})
        } catch (error) {
            router.push('/')
        } finally {
            setUser(null)
            router.push('/')
        }
    };
    const authUser = async () => {
        try {
            let loggedInUser = await userService.getLoggedInUser()
            setUser(loggedInUser)
            if (loggedInUser instanceof Employee && path.includes('admin') ||
                loggedInUser instanceof Employer && path.includes('employee')
            ) window.location.assign('/main') // Keep it that way: The method is quicker then the error that has been displayed by the employer func, unlik router.push ?? 
        } catch (error) {
                router.push('/')
        } finally {
                setLoadingAuth(false)
        }
    }
        const value = useMemo(() => ({
            isLoadingAuth,
            user,
            isLoadingLogin,
            login,
            logout
        }), [isLoadingAuth, user, isLoadingLogin]);
        

        useEffect(() => { // flow for making sure there is a loggedinuser and if not - redirect to the loginPage.
            setLoadingAuth(true)
              authUser()
        }, [])

        return (
        <UserContext.Provider value={{ ...value }}>
            {isLoadingAuth && <LoadingElement msg='Loading user...' />}
            {children}
        </UserContext.Provider>
    )};
        

    export function useAuth<T>(): useAuth<T> {
            return useContext(UserContext);
    }