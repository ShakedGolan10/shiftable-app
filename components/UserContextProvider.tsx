'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from './TanstackProvider';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { CreateUserInstance, Employee, Employer } from '@/types/class.service';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    // Done: change LoggedInUser to Employee
    // Done: create New Employee

    const [user, setUser] = useState(null)
    const [isLoadingAuth, setLoadingAuth] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => { // flow for making sure there is a loggedinuser and if not - redirect to the loginPage and 
        console.log('run')
        if (user) {
            console.log('1 if', user)
            setLoadingAuth(false)
            return
        }
        const authUser = async () => {
            let loggedInUser = await userService.getLoggedInUser()
            if (loggedInUser) {
                queryClient.setQueryData('loggedInUser', loggedInUser)
                setUser(loggedInUser)

            }
            setLoadingAuth(false)
            if (!loggedInUser) router.push('/')
        }

        let loggedInUser: any = queryClient.getQueryData('loggedInUser')

        if (loggedInUser) {
            // Done: if got from query - new Employer/Employee() : make a function or InstanceOf
            loggedInUser = CreateUserInstance(loggedInUser)
            setUser(loggedInUser)
            setLoadingAuth(false)
        } else authUser()
    }, [user])


    const mutation = useMutation({
        mutationFn: async (credentials: Credentials) => await userService.login(credentials),
        onSuccess(data) {
            setUser(data);
            queryClient.setQueryData('loggedInUser', data);
        }
    })



    const login = async (credentials: Credentials) => {
        try {
            await mutation.mutateAsync(credentials)
        } catch (error) {
            console.error('Login error:', error);
        }

    };

    const logout = () => {
        // Perform logout logic (e.g., clear user data or session)
        setUser(null);
    };

    const getLoggedInUser = async (): Promise<Employee | Employer | boolean> => {
        if (user) return user
        else return false
    }

    return (
        <UserContext.Provider value={{ isLoadingAuth, user, setUser, login, logout, getLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
