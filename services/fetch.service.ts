'use client'

import Axios from "axios"
import { KeyObjectType } from "crypto"
import Error from "next/error"

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/'
    : '/api/'
// const API_KEY: string = process.env.DATA_API_KEY as string

let axios = Axios.create({
    withCredentials: true
})

// TODO: Bulid a fucntion that determines the return value type 

export const fetchService = {
    GET(endpoint: string, data: string | object) {
        return api(endpoint, 'GET', data)
    },
    POST<T>(endpoint: string, data: string | object): Promise<T> {
        return api(endpoint, 'POST', data)
    },
    PUT(endpoint: string, data: string | object) {
        return api(endpoint, 'PUT', data)
    },
    DELETE(endpoint: string, data: string | object) {
        return api(endpoint, 'DELETE', data)
    }
}

const api = async (endpoint: string, method: string = 'GET', data: string | object) => {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method: method,
            data: data,
            params: (method === 'GET') ? data : null
        })
        return res.data
        // return DetermineReturnType(endpoint, method, res)
        // אני רוצה באמצעות הפונקציה הזו לבדוק ולוודא האם הערך החוזר מהסרבר הוא הנכון לפונקציה שקוראת לו
    } catch (error: any) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(error)
        if (error.response && error.response.status === 401) { // 401 means luck of authentication and that why we clear the session storage and redirect
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw error
    }
}


const DetermineReturnType = (endpoint: string, method: string, res: any) => {
    // הבעיה פה היא שהיוזר סרוויס (שקורא לפונקציה) אומר שהוא לא יכול לוודא שבאמת יחזור פרומיס של לוגגד אין יוזר
    if (endpoint === 'user' && method === 'GET') {
        return res as Promise<LoggedInUser>
    }
    if (endpoint === 'auth' && method === 'aa') {
        return res as Promise<string>
    }

    return Promise.reject('At Fetch service - invalid response type. The server doesnt returning the right value/value type')
}

// const CheckReturnType = (className: , res: any) => {
//     return className
// }

// CheckReturnType(new ReturnTypeDeterminer<T>, { name: 'ds', isAdming: 'sds' }) 