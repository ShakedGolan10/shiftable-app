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
    const url = (method === 'GET' && data) ? `${BASE_URL}${endpoint}?${createQueryParams(data)}` : `${BASE_URL}${endpoint}`
    console.log({url})
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
               throw err
    }
}

