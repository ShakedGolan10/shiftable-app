
import { ApplicationRules, Employer, TableShifts, WeeklyWorkflow } from "@/types/user/types.server"
import { queryOne, queryOneField } from "./db.service"
import { firestore } from "@/firebaseConfig.mjs"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const getEmployerWeeklyWorkflow = async (employerId: string) => {
  try {
    const applicationRules = await queryOneField<ApplicationRules>(`users/${employerId}`, 'application_rules')
    const { weeklyWorkflow } = await queryOne<Employer>(`users/${employerId}`)
    return { applicationRules, weeklyWorkflow }
  } catch (error) {
    throw new Error(`Error catched while trying to get shifts data at firebase: ${error}`)    
  }
}


export const createUserShiftsRequest = async (employeeId: string, employerId: string, forDate: string, shifts: TableShifts) => {
    try {
        const employerDocRef = doc(firestore, 'ShiftsReq', employerId);
        const forDateCollectionRef = collection(employerDocRef, 'ForDate');
        const forDateDocRef = doc(forDateCollectionRef, forDate); 
        const employeeCollectionRef = collection(forDateDocRef, 'employee');
        const employeeDocRef = doc(employeeCollectionRef, employeeId);
      
        const employeeDoc = await getDoc(employeeDocRef);
    
      if (employeeDoc.exists()) {
        await updateDoc(employeeDocRef, {
          shifts,
        });
      } else {
        await setDoc(employeeDocRef, {
          shifts,
        });
      }
    } catch (error) {
        throw new Error(`Error catched while trying to save shift req data at firebase: ${error}`)
    }
}