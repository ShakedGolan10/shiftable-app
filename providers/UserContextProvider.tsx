'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';
import { Falsey } from 'lodash';
import LoadingElement from '@/components/loading-element';

interface useAuth<T> {
    isLoadingAuth: boolean
    isLoadingLogin: boolean
    user: T 
    login: (credentials: Credentials) => Promise<void> 
    logout: () => void 
    
}

const UserContext = createContext(null);


export const UserProvider = ({ children } : {children: React.ReactNode}) => {

    const [user, setUser] = useState<Employee | Employer | Falsey>(null)
    const [isLoadingAuth, setLoadingAuth] = useState(null)
    const [isLoadingLogin, setLoadingLogin] = useState(null)
    const router = useRouter()
    
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
                    let user = await userService.login(credentials)
                    user = CreateUserInstance(user)
                    setUser(user)
                    router.push('/main')
                } catch (error) {
                    console.error('Login error:', error);
                    } finally {
                        setLoadingLogin(false)
                    }
                }
                
            const logout = async () : Promise<void> => {
                try {
                    setLoadingAuth(true)
                    await userService.logout()
                    setUser(null)
                    router.push('/')
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    setLoadingAuth(false)
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