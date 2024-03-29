'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect, cache } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from './TanstackProvider';
import { useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    // Done: change LoggedInUser to Employee
    // Done: create New Employee

    const [user, setUser] = useState(null)
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
        }
        else authUser()
    }, [user])

   



    const login = async (credentials: Credentials) => {
        try {
            let user = await userService.login(credentials)
            user = CreateUserInstance(user)
            setUser(user)
        } catch (error) {
            console.error('Login error:', error);
            throw error
        }

    };

    const logout = () => {
        // queryClient.clear()
        setUser(null)
        router.push('/')
    };



    return (
        <UserContext.Provider value={{ isLoadingAuth, user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
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