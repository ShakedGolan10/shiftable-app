'use server'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { queryMany, queryOne } from "./db.service"
import { Employee } from "@/types/class.service"
import { ShiftReqs } from "@/types/user/types.server"


export const getEmployeesByFilter = async (filterBy: Params, employerId: string) => {
    filterBy = {...filterBy, employerId}
    const data = await queryMany<Employee>('users', filterBy)
    return data
}
export const getEmployeesShiftsReqs = async (employerId: string, forDate: string) => {
    let data = await queryMany<ShiftReqs>(`ShiftsReq/${employerId}/ForDate/${forDate}/employee`)
    
    await Promise.all(data.map(async (item, idx) => {
        const user = await queryOne<Employee>(`users/${item.id}`)
        data[idx] = {...data[idx], name: user.name}
    }))
    return data
}