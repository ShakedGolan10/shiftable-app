'use client'

import { Employee } from "@/types/class.service"
import { fetchService } from "./fetch.service"
import { ShiftReqs } from "./shifts.service"


export const getEmployeesByFilter = async (filterBy: {field: string, value: number | string | boolean}[], userId: string) => {
    const data = await fetchService.GET<Employee[]>(`employer/${userId}`, filterBy)
    return data
}


export const getEmployeesShiftsReqs = async (forDate: string) => {
    const data = await fetchService.GET<ShiftReqs[]>(`shift_req/${forDate}`)
    return data
}