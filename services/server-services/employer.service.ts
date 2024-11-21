'use server'
import { queryMany, queryOne } from "./db.service"
import { Employee } from "@/types/class.service"
import { ShiftReqs, ShiftReqsOOP } from "@/types/user/types.server"
import { firestore } from "@/firebaseConfig.mjs"
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

export const saveEmployerMsgs = async (
    employerId: string,
    newMsgs: string[]
  ) => {
    try {
      const employerRef = doc(firestore, 'users', employerId);
  
        await updateDoc(employerRef, {employerMsg: newMsgs});
    } catch (error) {
      throw new Error(`Error updating employer msgs: ${error}`);
    }
  };

