'use client'

import { Employee } from "@/types/class.service"
import { fetchService } from "./fetch.service"


export const getEmployeesByFilter = async (filterBy: {field: string, value: number | string | boolean}, userId: string, ) => {
    const data = await fetchService.GET<Employee[]>(``)
    return data
}


