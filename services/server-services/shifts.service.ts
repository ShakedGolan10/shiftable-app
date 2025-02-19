'use server'
import { queryOne, queryOneField } from "./db.service"
import { firestore } from "@/firebase.config.mjs"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const getEmployerWeeklyShifts = async (employerId: string) => {
  try {
    const weeklyWorkflow = await queryOneField<WeeklyShifts>(`users/${employerId}`, 'weeklyWorkflow')
    return weeklyWorkflow 
  } catch (error) {
    throw new Error(`Error catched while trying to get shifts data at firebase: ${error}`)    
  }
}
export const getEmployerApplicationRules = async (employerId: string) => {
  try {
    const applicationRules = await queryOneField<ApplicationRules>(`users/${employerId}`, 'applicationRules')
    return applicationRules 
  } catch (error) {
    throw new Error(`Error catched while trying to get shifts data at firebase: ${error}`)    
  }
}


export const saveUserShiftsRequest = async (employeeId: string, employerId: string, forDate: string, shifts: TableShifts) => {
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

export const saveWeeklySchedule = async (
  employerId: string,
  forDate: string,
  scheduleData: any
) => {
  try {
    const weeklyScheduleDocRef = doc(firestore, 'weeklySchedule', employerId, 'forDate', forDate);
    const weeklyScheduleDoc = await getDoc(weeklyScheduleDocRef);

    if (weeklyScheduleDoc.exists()) {
      await updateDoc(weeklyScheduleDocRef, scheduleData);
    } else {
      await setDoc(weeklyScheduleDocRef, scheduleData);
    }
  } catch (error) {
    throw new Error(`Error updating employee schedule: ${error}`);
  }
};

export const getWeeklySchedule = async (
  employerId: string,
  forDate: string,
) => {
  try {
    const existedSchedule = await queryOne<DayOrientedObject<{[key: string]: string}>>(`weeklySchedule/${employerId}/forDate/${forDate}`)
    return existedSchedule
  } catch (error) {
    throw new Error(`Error getting schedule: ${error}`);
  }
};

export const getTodaySchedule = async (
  employerId: string,
  forDate: string,
  dayName: string
) => {
  try {
    
    const existedSchedule = await queryOneField<{ [key:string] : { [key: string]: string } }>(`weeklySchedule/${employerId}/forDate/${forDate}`, dayName)
    return existedSchedule
  } catch (error) {
    throw new Error(`Error getting schedule: ${error}`);
  }
};





