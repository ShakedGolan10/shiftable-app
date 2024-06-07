'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, cache } from 'react';
import { useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';
import { Falsey } from 'lodash';

interface useAuth {
    isLoadingAuth: boolean
    user: Employee | Employer 
    login: () => Promise<void> 
    logout: () => void 
    
}

const UserContext = createContext(null);


export const UserProvider = ({ children } : {children: React.ReactNode}) => {

    const [user, setUser] = useState<Employee | Employer | Falsey>(null)
    const [isLoadingAuth, setLoadingAuth] = useState(true)
    const router = useRouter()
    
    useEffect(() => { // flow for making sure there is a loggedinuser and if not - redirect to the loginPage and 
        const authUser = async () => {
            try {
                let loggedInUser = await userService.getLoggedInUser()
                setUser(loggedInUser)
                setLoadingAuth(false)
                } catch (error) {
                    setLoadingAuth(false)
                    router.push('/')
                    }
            }
            if (user) {
                setLoadingAuth(false)
                return
    
            } else authUser()
    }, [user])
                        
            const login = async (credentials: Credentials) : Promise<void> => {
                try {
                    let user = await userService.login(credentials)
                    user = CreateUserInstance(user)
                    setUser(user)
                } catch (error) {
                    console.error('Login error:', error);
                    throw error
                    }};
            const logout = () : void => {
                // queryClient.clear()
                setUser(null)
                router.push('/')
                };
        return (
        <UserContext.Provider value={{ isLoadingAuth, user, login, logout }}>
            {children}
        </UserContext.Provider>
    )};
    
    export const useAuth = () : useAuth => {
        return useContext(UserContext);
        };
        
        
        // const setUserState = (user) => {
            //     user = CreateUserInstance(user)
            //     setUser(user)
            //     setLoadingAuth(false)
            // }
            
            // const loginMutation = useMutation({
                //     mutationFn: async (credentials: Credentials) => await userService.login(credentials),
                //     onSuccess(data) {
    //         const loggedInUser = CreateUserInstance(data)
    //         queryClient.setQueryData('loggedInUser', loggedInUser);
    //         setUser(loggedInUser);
    //     }
    // })

      // let loggedInUser: any = queryClient.getQueryData('loggedInUser')
        // if (loggedInUser) setUserState(loggedInUser)
        // else if (!loggedInUser) loggedInUser = queryClient.getMutationCache()
        // if (loggedInUser.mutations.length) setUserState(loggedInUser.mutations[0])