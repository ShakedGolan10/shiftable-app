'use client'

import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

// import Axios from "axios"
// import { Request } from "node-fetch"

const BASE_URL = '/api/'
// const API_KEY: string = process.env.DATA_API_KEY as string

export const fetchService = {
    GET<T>(endpoint: string, data?: Params): Promise<T> {
        return api(endpoint, 'GET', data)
    },
    POST<T>(endpoint: string, data?: string | object): Promise<T> {
        return api(endpoint, 'POST', data)
    },
    PUT<T>(endpoint: string, data: string | object): Promise<T> {
        return api(endpoint, 'PUT', data)
    },
    DELETE<T>(endpoint: string, data: string | object): Promise<T> {
        return api(endpoint, 'DELETE', data)
    }
}
const api = async (endpoint: string, method: string = 'GET', data: any = null) => {
    const url = (method === 'GET' && data) ? `${BASE_URL}${endpoint}?${new URLSearchParams(data)}` : `${BASE_URL}${endpoint}`
    const request = (method === 'GET') ? new Request(url, { method }) :
        new Request(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    try {
        const res = await fetch(request)
        // const res = await fetch({
        //     url: `${BASE_URL}${endpoint}`,
        //     method: method,
        //     formData: JSON.stringify(data),
        //     params: (method === 'GET') ? data : null
        // })
        return await res.json()
    } catch (error: any) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        if (error.response && error.response.status === 401) { // 401 means luck of authentication and that why we clear the session storage and redirect
            sessionStorage.clear()
            window.location.assign('/')
            return null
        }
        throw error
    }
}


