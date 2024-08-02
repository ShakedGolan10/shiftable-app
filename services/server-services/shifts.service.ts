
import { ApplicationRules, TableShifts, WeeklyWorkflow } from "@/types/user/types.server"
import { queryOne, queryOneField } from "./db.service"
import { firestore } from "@/firebaseConfig.mjs"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const getUserApplicableShifts = async (uid: string, employerId: string) => {
  try {
    const applicationRules = await queryOneField<ApplicationRules>(`users/${employerId}`, 'application_rules')
    const applicableShifts = await queryOne<WeeklyWorkflow>(`users/${employerId}/applicable_shifts/${uid}`)
    return { applicationRules, applicableShifts }
  } catch (error) {
    throw new Error(`Error catched while trying to get shifts data at firebase: ${error}`)    
  }
}


export const postUserShiftsRequest = async (employeeId: string, employerId: string, forDate: Date, shifts: TableShifts) => {
    try {
        const employerDocRef = doc(firestore, 'ShiftsReq', employerId);
        const forDateCollectionRef = collection(employerDocRef, 'ForDate');
        const forDateDocRef = doc(forDateCollectionRef, forDate.toString()); 
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