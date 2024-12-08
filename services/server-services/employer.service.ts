'use server'
import { queryMany, queryOne, saveOneField } from "./db.service"
import { Employee } from "@/types/class.service"
import { ShiftReqs, ShiftReqsOOP } from "@/types/user/types.server"
import { firestore } from "@/firebase.config.mjs"
import { doc, updateDoc } from "firebase/firestore"


export const getEmployeesByFilter = async (filterBy = {}, employerId: string) => {
    filterBy = {...filterBy, employerId}
    const data = await queryMany<Employee>('users', filterBy)
    return data
}
export const getEmployeesShiftsReqs = async (employerId: string, forDate: string) => {
    const data = await queryMany<ShiftReqs>(`ShiftsReq/${employerId}/ForDate/${forDate}/employee`)
    let dataObj = {}
    await Promise.all(data.map(async (item, idx) => {
        const user = await queryOne<Employee>(`users/${item.id}`)
        dataObj[item.id] = {...item, name: user.name}
    }))
    return dataObj as ShiftReqsOOP
}

