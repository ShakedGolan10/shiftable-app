'use client'
import { userService } from '@/services/user.service';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from './TanstackProvider';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const authUser = async () => {
            console.log('effect')
            if (!user) {
                let loggedInUser = await userService.getLoggedInUser()
                setUser(loggedInUser)
            } // in first run V // in second run 
            setLoadingAuth(false) // in first run X
        }
        authUser()
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

    const getLoggedInUser = async (): Promise<LoggedInUser | boolean> => {
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
