'use server'
import { ApplicationRules, Employer, TableShifts, WeeklyShifts } from "@/types/user/types.server"
import { queryOne, queryOneField } from "./db.service"
import { firestore } from "@/firebaseConfig.mjs"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const getEmployerWeeklyShifts = async (employerId: string) => {
  try {
    const applicationRules = await queryOneField<ApplicationRules>(`users/${employerId}`, 'application_rules')
    const weeklyWorkflow = await queryOneField<WeeklyShifts>(`users/${employerId}`, 'weeklyWorkflow')
    return { applicationRules, weeklyWorkflow }
  } catch (error) {
    throw new Error(`Error catched while trying to get shifts data at firebase: ${error}`)    
  }
}


export const createUserShiftsRequest = async (employeeId: string, employerId: string, forDate: string, shifts: TableShifts) => {
    try {
      const employeeDocRef = doc(firestore, 'ShiftsReq', employerId, 'ForDate', forDate, 'employee', employeeId);
      const employeeDoc = await getDoc(employeeDocRef);
      const employeeUserRef = doc(firestore, 'users', employeeId);
      
      if (employeeDoc.exists()) {
        await updateDoc(employeeDocRef, { shifts });
      } else {
        await setDoc(employeeDocRef, { shifts });
      }
  
      await updateDoc(employeeUserRef, { isApplied: true });
    } catch (error) {
        throw new Error(`Error catched while trying to save shift req data at firebase: ${error}`)
    }
}

export const saveEmployeeShifts = async (
  employerId: string,
  forDate: string,
  scheduleData: any
) => {
  try {
    const employeeDocRef = doc(firestore, 'weeklySchedule', employerId, 'forDate', forDate);
    const employeeDoc = await getDoc(employeeDocRef);

    if (employeeDoc.exists()) {
      await updateDoc(employeeDocRef, scheduleData);
    } else {
      await setDoc(employeeDocRef, scheduleData);
    }
  } catch (error) {
    throw new Error(`Error updating employee schedule: ${error}`);
  }
};



