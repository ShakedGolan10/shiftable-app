'use client'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import Axios from 'axios'

const BASE_URL = '/api/'

let axios = Axios.create({
    withCredentials: false
})

const createQueryParams = (filterBy: Params[]) => {
    const queryParams = new URLSearchParams();
    for (const entity of filterBy) {
        const { field, value } = entity;
        queryParams.append(field, value);
    }
    return queryParams.toString();
}

export const fetchService = {
    GET<T>(endpoint: string, data?: Params[]): Promise<T> {
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
    if ((method === 'GET' && data)) console.log('queryParams:', createQueryParams(data))
    const url = (method === 'GET' && data) ? `${BASE_URL}${endpoint}?${createQueryParams(data)}` : `${BASE_URL}${endpoint}`
    try {
        const res = await axios({
            url,
            method,
            data: (method === 'GET') ? '' : data,
        })
        return await res.data
    } catch (err) {
        console.log('arrived error', err)
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        if (err.response && err.response.status === 401) { // 401 means luck of authentication and that why we clear the session storage and redirect
            sessionStorage.clear()
            if (!url.endsWith('/api/user')) window.location.assign('/')
            return null
        }
        throw err
    }
}


async function ajax<T>(endpoint: string, method = 'GET', data = null, query?: object):Promise<T> {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}${((method === 'GET' || method === 'DELETE') && data) ? `/${data}` : ''}`,
            method,
            data,
            params: (method === 'GET' && query) ? query : null
        })
        return res.data 
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}


