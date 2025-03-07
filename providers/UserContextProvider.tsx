'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';
import LoadingElement from '@/components/helpers/loading-element';
import { useAsyncAuth } from '@/hooks/useAsyncAuth';
import { useSystemActions } from '@/store/actions/system.actions';

interface useAuth<T> {
    isLoadingAuth: boolean
    user: T 
    login: (credentials: Credentials) => Promise<void> 
    logout: () => Promise<void> 
    isUserSessionValid: () => Promise<boolean> 
}

const UserContext = createContext(null);


export const UserProvider = ({ children } : {children: React.ReactNode}) => {

    const [user, setUser] = useState<Employee | Employer>(null)
    const [isLoadingAuth, setLoadingAuth] = useState(null)
    const router = useRouter();
    const path = usePathname() 
    const [ executeAuthFunc ] = useAsyncAuth()
    const { toggleLoaderAction } = useSystemActions()
            
    const login = async (credentials: Credentials) : Promise<void> => {
        try {
            toggleLoaderAction()
            let user = await executeAuthFunc({
                asyncOperation: () => userService.login(credentials), 
                errorMsg: 'Couldnt login, please try again',
            }) 
            if (!user) throw new Error('error')
                user = CreateUserInstance(user)
                setUser(user)
                if (user instanceof Employer && user.onboardingStep) router.push('/main/onboarding')
                    else router.push('/main')
        } catch (error) {
                    throw new Error(error)
        } finally {
                toggleLoaderAction()
        }
    }    

    const logout = async () : Promise<void> => {
        try {
            await executeAuthFunc({asyncOperation: () => userService.logout(), errorMsg: 'Couldnt logout, please try again'})
        } catch (error) {
            console.log('there was an error while trying to log out')
        } finally {
            setUser(null)
            router.push('/')
        }
    };

    const authUser = async () => {
        try {
            if (path.includes('signup')) return 
            setLoadingAuth(true)
            let loggedInUser = await userService.getLoggedInUser()
            setUser(loggedInUser)
            validatePath(loggedInUser)
        } catch (error) {
            setUser(null)
            router.push('/')
        } finally {
                setLoadingAuth(false)
        }
    }

    const validatePath = (userParam?: Employee | Employer) => {
        const loggedInUser = (userParam) ? userParam : user
        if (!loggedInUser) router.push('/')
        else if (loggedInUser instanceof Employer && loggedInUser.onboardingStep && !path.includes('onboarding')) router.push('/main/onboarding')
        else if (loggedInUser instanceof Employee && path.includes('/admin/') || loggedInUser instanceof Employer && path.includes('/employee/') || (loggedInUser && path === '/')) 
                router.push('/main')
    }

    const isUserSessionValid = async () => {
        try {
            await userService.getLoggedInUser()
            return true
        } catch (error) {
                await logout()
                return false
        } finally {
                setLoadingAuth(false)
        }
    }

    const value = useMemo(() => ({
            isLoadingAuth,
            user,
            login,
            logout,
            isUserSessionValid
    
        }), [isLoadingAuth, user]);
        

        useEffect(() => { // flow for making sure there is a loggedinuser and if not - redirect to the loginPage.
            if (!user) authUser()
                else validatePath()
        }, [path])

        return (
        <UserContext.Provider value={{ ...value }}>
            {isLoadingAuth && <LoadingElement msg='Loading user...' />}
            {children}
        </UserContext.Provider>
    )};
        

    export function useAuth<T>(): useAuth<T> {
            return useContext(UserContext);
    }