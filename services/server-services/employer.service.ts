'use server'
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { queryMany, queryOne } from "./db.service"
import { Employee } from "@/types/class.service"
import { ShiftReqs, ShiftReqsOOP } from "@/types/user/types.server"
import { firestore } from "@/firebaseConfig.mjs"
import { doc, getDoc, updateDoc } from "firebase/firestore"


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

  export const updateUserCredentials = async (newEmail, newPassword) => {
    const user = auth.currentUser;
  
    if (user) {
      try {
        // Update email
        await updateEmail(user, newEmail);
        console.log("Email updated successfully");
  
        // Update password
        await updatePassword(user, newPassword);
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating user credentials:", error);
        // Handle re-authentication if required
      }
    } else {
      console.log("No user is signed in.");
    }
  }